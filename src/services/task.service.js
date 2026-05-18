// services/task.service.js

const taskRepository =
    require("../repositories/task.repositoy");
const boardRepository =
    require("../repositories/board.repository");
const authRepository = require("../repositories/auth.repository");
const pool = require("../config/db");

const createTask = async (
    payload,
    user_id
) => {

    const sameTitleTask = await taskRepository.getTaskByTitle(payload.title)
    console.log('sameTitleTask', sameTitleTask)
    if (sameTitleTask?.title) {
        throw {
            message: "same name title is exist",
            statusCode: 409
        };
    }

    const maxtaskCount = await taskRepository.maxtaskCount(payload.board_id)
    if (!maxtaskCount.max) {
        maxtaskCount.max = 0
    }
    payload.position = maxtaskCount.max + 1
    console.log('payload.position', payload.position)
    if (payload.assigned_to) {
        const isaValidUser = await authRepository.findUserById(payload.assigned_to)
        if (!isaValidUser) {
            throw ({
                message: "Assign user mot found",
                statusCode: 404

            }
            )
        }
    }

    if (payload.due_date && new Date(payload.due_date) < new Date()) {
        throw ({
            message: "Due date must biiger then today' date",
            code: 400
        })
    }

    return await taskRepository.createTask(
        payload,
        user_id
    );
};

const getTasks = async (
    board_id,
    user_id,
    queryParams
) => {

    const {
        page = 1,
        limit = 10,
        search = '',
        status,
        priority,
        sort_by = 'position',
        sort_order = 'asc'
    } = queryParams;

    /*
        pagination calculation
    */
    const offset =
        (page - 1) * limit;

    /*
        sorting validation
    */
    const allowedSortFields = [
        'position',
        'created_at',
        'due_date',
        'priority'
    ];

    if (
        !allowedSortFields.includes(sort_by)
    ) {
        throw new Error('Invalid sort field');
    }

    /*
        sort order validation
    */
    const allowedSortOrder = [
        'asc',
        'desc'
    ];

    if (
        !allowedSortOrder.includes(
            sort_order.toLowerCase()
        )
    ) {
        throw new Error('Invalid sort order');
    }

    return await taskRepository.getTasks({
        board_id,
        offset,
        limit,
        search,
        status,
        priority,
        sort_by,
        sort_order
    });
};

const getTaskById = async (
    id,
    user_id
) => {

    /*
        ADD LOGIC HERE

        ✅ ownership validation

        ✅ include comments

        ✅ include labels

        ✅ include assigned user
    */

    const task =
        await taskRepository.getTaskById(id);

    if (!task) {

        throw {
            message: "Task not found",
            statusCode: 404
        };
    }

    return task;
};

const updateTask = async (
    id,
    payload,
    user_id
) => {

    /*
        ADD LOGIC HERE

        ✅ ownership validation

        ✅ dynamic partial update

        ✅ duplicate title validation

        ✅ task activity logs

        ✅ due date validation

        ✅ assigned user validation

        ✅ prevent invalid status flow

        ✅ reorder logic if position updated

        ✅ transaction if multiple updates
    */

    return await taskRepository.updateTask(
        id,
        payload
    );
};

const deleteTask = async (
    id,
    user_id
) => {

    return await taskRepository.deleteTask(id);
};

const reorderTask = async (
    payload,
    user_id
) => {

    const client = await pool.connect();
    try {

        const getTaskDetails = await taskRepository.getTaskById(
            payload.task_id
        );

        const oldValues = {
            board_id: getTaskDetails.board_id,
            position: getTaskDetails.position
        };

        const newValues = {
            board_id: payload.board_id,
            position: payload.destination_position
        };

        if (getTaskDetails.board_id !== payload.board_id) {

            await taskRepository.reorderBoard(
                payload.board_id,
                payload.destination_position
            );

            await taskRepository.reorderCurrentBoardTasks(
                getTaskDetails.board_id,
                getTaskDetails.position
            );

        } else {

            if (
                payload.destination_position === getTaskDetails.position
            ) {
                return getTaskDetails;
            }

            if (
                payload.destination_position >
                getTaskDetails.position
            ) {

                await taskRepository.sameBoardTaskReorderDown(
                    getTaskDetails.board_id,
                    payload.destination_position,
                    getTaskDetails.position
                );

            } else {

                await taskRepository.sameBoardTaskReorderUp(
                    getTaskDetails.board_id,
                    payload.destination_position,
                    getTaskDetails.position
                );
            }
        }

        await taskRepository.updateTaskDetails(
            payload.board_id,
            payload.task_id,
            payload.destination_position
        );

        await activityRepository.createActivityLog(
            payload.task_id,
            'task_moved',
            oldValues,
            newValues,
            user_id
        );

        return true;
    } catch (err) {

        throw error;
    }
};

const moveTask = async (
    payload,
    user_id
) => {

    /*
        ADD LOGIC HERE

        ✅ source board validation

        ✅ destination board validation

        ✅ ownership validation

        ✅ source board reorder

        ✅ destination board reorder

        ✅ update task board_id

        ✅ update task new position

        ✅ prevent invalid move

        ✅ transaction mandatory

        ✅ activity logs
    */

    return true;
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    reorderTask,
    moveTask
};