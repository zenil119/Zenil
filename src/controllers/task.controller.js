// controllers/task.controller.js

const taskService =
    require("../services/task.service");

const {
    successResponse
} = require("../utils/response");

const {
    createTaskValidation,
    updateTaskValidation,
    reorderTaskValidation,
    moveTaskValidation,
    getTasksValidation
} = require("../validations/task.validation");

const createTask = async (
    req,
    res,
    next
) => {

    try {

        const { error } =
            createTaskValidation.validate(
                req.body
            );

        if (error) {

            throw {
                message:
                    error.details[0].message,

                statusCode: 400
            };
        }

        const task =
            await taskService.createTask(
                req.body,
                req.user.id
            );

        return successResponse(
            res,
            "Task created successfully",
            task,
            201
        );

    } catch (err) {

        next(err);

    }
};

const getTasks = async (
    req,
    res,
    next
) => {

    const { error } = getTasksValidation.validate(req.query)

    if (error) {

        throw {
            message:
                error.details[0].message,

            statusCode: 400
        };
    }

    try {

        const tasks = await taskService.getTasks(
            req.params.board_id,
            req.user.id,
            req.query
        );

        return successResponse(
            res,
            "Tasks fetched successfully",
            tasks
        );

    } catch (err) {

        next(err);

    }
};

const getTaskById = async (
    req,
    res,
    next
) => {

    try {

        const task =
            await taskService.getTaskById(
                req.params.id,
                req.user.id
            );

        return successResponse(
            res,
            "Task fetched successfully",
            task
        );

    } catch (err) {

        next(err);

    }
};

const updateTask = async (
    req,
    res,
    next
) => {

    try {

        const { error } =
            updateTaskValidation.validate(
                req.body
            );

        if (error) {

            throw {
                message:
                    error.details[0].message,

                statusCode: 400
            };
        }

        const task =
            await taskService.updateTask(
                req.params.id,
                req.body,
                req.user.id
            );

        return successResponse(
            res,
            "Task updated successfully",
            task
        );

    } catch (err) {

        next(err);

    }
};

const deleteTask = async (
    req,
    res,
    next
) => {

    try {

        await taskService.deleteTask(
            req.params.id,
            req.user.id
        );

        return successResponse(
            res,
            "Task deleted successfully"
        );

    } catch (err) {

        next(err);

    }
};

const reorderTask = async (
    req,
    res,
    next
) => {

    try {

        const { error } =
            reorderTaskValidation.validate(
                req.body
            );

        if (error) {

            throw {
                message:
                    error.details[0].message,

                statusCode: 400
            };
        }

        const task =
            await taskService.reorderTask(
                req.body,
                req.user.id
            );

        return successResponse(
            res,
            "Task reordered successfully",
            task
        );

    } catch (err) {

        next(err);

    }
};

const moveTask = async (
    req,
    res,
    next
) => {

    try {

        const { error } =
            moveTaskValidation.validate(
                req.body
            );

        if (error) {

            throw {
                message:
                    error.details[0].message,

                statusCode: 400
            };
        }

        const task =
            await taskService.moveTask(
                req.body,
                req.user.id
            );

        return successResponse(
            res,
            "Task moved successfully",
            task
        );

    } catch (err) {

        next(err);

    }
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