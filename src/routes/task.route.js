// routes/task.route.js

const express = require("express");

const router = express.Router();

const taskController =
    require("../controllers/task.controller");


// CREATE TASK
router.post(
    "/create",
    taskController.createTask
);


// GET TASKS BY BOARD
router.get(
    "/board/:board_id",
    taskController.getTasks
);


// GET SINGLE TASK
router.get(
    "/:id",
    taskController.getTaskById
);


// UPDATE TASK
router.patch(
    "/:id",
    taskController.updateTask
);


// DELETE TASK
router.delete(
    "/:id",
    taskController.deleteTask
);


// REORDER TASK
router.patch(
    "/reorder/position",
    taskController.reorderTask
);


// MOVE TASK BETWEEN BOARDS
router.patch(
    "/move/board",
    taskController.moveTask
);

module.exports = router;