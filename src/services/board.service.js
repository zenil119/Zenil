const boardRepository =
    require("../repositories/board.repository");
const projectRepository = require("../repositories/project.repository");

const createBoard = async (
    project_id,
    name,
    user_id
) => {
    const projectOwner = await projectRepository.getProjectById(project_id, user_id)
    if (!projectOwner) {
        throw {
            message:
                "You can not create board in other's projecrt",

            statusCode: 403
        };
    }

    const isSameBoardName = await boardRepository.getBoardByName(name)
    if (isSameBoardName?.name) {
        throw {
            message:
                "Board name already exist",

            statusCode: 409
        };
    }

    const maxBoardPosition = await boardRepository.getMaxBoardPosion(project_id)
    const maxPos = maxBoardPosition.max + 1

    return await boardRepository.createBoard(
        project_id,
        name,
        maxPos
    );
};

const getBoards = async (
    project_id
) => {

    return await boardRepository.getBoards(
        project_id
    );
};

const getBoardById = async (
    id
) => {

    const board =
        await boardRepository.getBoardById(id);

    if (!board) {

        throw {
            message: "Board not found",
            statusCode: 404
        };
    }

    return board;
};

const updateBoard = async (
    id,
    payload
) => {
    if (
        Object.keys(payload).length === 0
    ) {

        throw {
            message: "At least one field is required",
            statusCode: 400
        };
    }
    const { name } = payload

    const isSameBoardName = await boardRepository.getBoardByName(name)
    if (isSameBoardName?.name) {
        throw {
            message:
                "Board name already exist",

            statusCode: 409
        };
    }

    return await boardRepository.updateBoard(
        id,
        payload
    );
};

const deleteBoard = async (
    id
) => {

    const board =
        await boardRepository.getBoardById(id);

    if (!board) {

        throw {
            message: "Board not found",
            statusCode: 404
        };
    }

    return await boardRepository.deleteBoard(id);
};

const boardReorder = async (board_id, project_id, new_position, user_id) => {
    const getProjectDetails = await projectRepository.getProjectById(project_id, user_id)
    if (!getProjectDetails) {
        throw {
            message: "Project not found",
            statusCode: 404
        };
    }
    const getBoardDetails = await boardRepository.getBoardById(board_id)
    if (!getBoardDetails) {
        throw {
            message: "Board not found",
            statusCode: 404
        };
    }
    if (getBoardDetails.position === new_position) {
        return getBoardDetails
    }
    const totalBoards = await boardRepository.getTotalBoardCount(project_id)
    if (new_position > totalBoards || new_position < 1) {
        throw {
            message:
                "Invalid board position",

            statusCode: 400
        };
    }
    try {
        console.log('::>>',getBoardDetails.position < new_position, )
        if (getBoardDetails.position > new_position) {
            await boardRepository.moveBoardsUp(project_id, getBoardDetails.position, new_position)
        } else {
            await boardRepository.moveBoardsDown(project_id, getBoardDetails.position, new_position)
        }
        let position = new_position
        const bordPostionUpdate = await boardRepository.updateBoard(board_id, { position })
        return bordPostionUpdate
    } catch (err) {
        throw err;
    }

}

module.exports = {
    createBoard,
    getBoards,
    getBoardById,
    updateBoard,
    deleteBoard,
    boardReorder
};