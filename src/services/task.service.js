// services/task.service.js

const taskRepository =
    require("../repositories/task.repositoy");
    const boardRepository =
    require("../repositories/board.repository");

const createTask = async (
    payload,
    user_id
) => {

    const boardOwner = await boardRepository.getBoardById(payload.board_id)
    if(boardOwner.created_by !== user_id) {
        throw {
            message: "you have no access for crrate task",
            statusCode: 404
        };
    }

    const sameTitleTask  = await taskRepository.boardOwner()

    /*
        ADD LOGIC HERE

        ✅ duplicate task title check

        ✅ task position logic
           (new task should go last)

        ✅ assigned user validation

        ✅ due date validation

        ✅ status validation

        ✅ priority validation
    */

    return await taskRepository.createTask(
        payload,
        user_id
    );
};

const getTasks = async (
    board_id,
    user_id
) => {

    /*
        ADD LOGIC HERE

        ✅ board ownership validation

        ✅ sorting

        ✅ filtering

        ✅ pagination

        ✅ search
    */

    return await taskRepository.getTasks(
        board_id
    );
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

    /*
        ADD LOGIC HERE

        ✅ ownership validation

        ✅ reorder remaining tasks

        ✅ activity logs

        ✅ transaction
    */

    return await taskRepository.deleteTask(id);
};

const reorderTask = async (
    payload,
    user_id
) => {

    /*
        ADD LOGIC HERE

        ✅ ownership validation

        ✅ same board reorder logic

        ✅ move up logic

        ✅ move down logic

        ✅ prevent invalid position

        ✅ transaction

        ✅ activity logs
    */

    return true;
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