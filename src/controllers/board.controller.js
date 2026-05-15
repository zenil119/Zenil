const boardService =
    require("../services/board.service");

const {
    successResponse
} = require("../utils/response");

const {
    createBoardValidation,
    updateBoardValidation,
    boardReorderValidation
} = require("../validations/board.validation");

const createBoard = async (
    req,
    res,
    next
) => {

    try {

        const { error } =
            createBoardValidation.validate(
                req.body
            );

        if (error) {

            throw {
                message:
                    error.details[0].message,

                statusCode: 400
            };
        }

        const {
            project_id,
            name
        } = req.body;

        const user_id = req.user.id

        const board =
            await boardService.createBoard(
                project_id,
                name,
                user_id
            );

        return successResponse(
            res,
            "Board created successfully",
            board,
            201
        );

    } catch (err) {

        next(err);

    }
};

const getBoards = async (
    req,
    res,
    next
) => {

    try {

        const boards =
            await boardService.getBoards(
                req.params.project_id
            );

        return successResponse(
            res,
            "Boards fetched successfully",
            boards
        );

    } catch (err) {

        next(err);

    }
};

const getBoardById = async (
    req,
    res,
    next
) => {

    try {
        const board =
            await boardService.getBoardById(
                req.params.id
            );

        return successResponse(
            res,
            "Board fetched successfully",
            board
        );

    } catch (err) {

        next(err);

    }
};

const updateBoard = async (
    req,
    res,
    next
) => {

    try {

        const { error } =
            updateBoardValidation.validate(
                req.body
            );

        if (error) {

            throw {
                message:
                    error.details[0].message,

                statusCode: 400
            };
        }

        const board =
            await boardService.updateBoard(
                req.params.id,
                req.body
            );

        return successResponse(
            res,
            "Board updated successfully",
            board
        );

    } catch (err) {

        next(err);

    }
};

const deleteBoard = async (
    req,
    res,
    next
) => {

    try {

        await boardService.deleteBoard(
            req.params.id
        );

        return successResponse(
            res,
            "Board deleted successfully"
        );

    } catch (err) {

        next(err);

    }
};

const boardReorder = async (
    req,
    res,
    next
) => {

    try {

        const { error } =
            boardReorderValidation.validate(
                req.body
            );

        if (error) {

            throw {
                message:
                    error.details[0].message,

                statusCode: 400
            };
        }

        const { project_id, new_position } =
            req.body;

        const board =
            await boardService.boardReorder(
                req.params.id,
                project_id,
                new_position,
                req.user.id
            );

        return successResponse(
            res,
            "Board reordered successfully",
            board
        );

    } catch (err) {

        next(err);

    }
};

module.exports = {
    createBoard,
    getBoards,
    getBoardById,
    updateBoard,
    deleteBoard,
    boardReorder
};