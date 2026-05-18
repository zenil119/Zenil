// routes/label.route.js

const express = require("express");

const router = express.Router();

const labelController =
    require("../controllers/label.controller");


// CREATE LABEL
router.post(
    "/create",
    labelController.createLabel
);


// GET PROJECT LABELS
router.get(
    "/project/:project_id",
    labelController.getLabels
);


// GET SINGLE LABEL
router.get(
    "/:id",
    labelController.getLabelById
);


// UPDATE LABEL
router.patch(
    "/:id",
    labelController.updateLabel
);


// DELETE LABEL
router.delete(
    "/:id",
    labelController.deleteLabel
);


// ASSIGN LABEL TO TASK
router.post(
    "/assign/task",
    labelController.assignLabelToTask
);


// REMOVE LABEL FROM TASK
router.delete(
    "/remove/task",
    labelController.removeLabelFromTask
);

module.exports = router;