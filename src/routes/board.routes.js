const express = require("express");

const router = express.Router();

const boardController =
    require("../controllers/board.controller");

router.post(
    "/create",
    boardController.createBoard
);

router.get(
    "/:project_id",
    boardController.getBoards
);

router.get(
    "/single/:id",
    boardController.getBoardById
);

router.put(
    "/:id",
    boardController.updateBoard
);

router.delete(
    "/:id",
    boardController.deleteBoard
);

router.patch("/reorder/:id", boardController.boardReorder)

module.exports = router;