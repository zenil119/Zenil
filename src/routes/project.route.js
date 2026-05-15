const express = require("express");

const router = express.Router();

const projectController =
    require("../controllers/project.controller");


// CREATE PROJECT
router.post(
    "/create",
    projectController.createProject
);


// GET ALL PROJECTS
router.get(
    "/",
    projectController.getProjects
);


// GET SINGLE PROJECT
router.get(
    "/:id",
    projectController.getProjectById
);


// UPDATE PROJECT
router.put(
    "/:id",
    projectController.updateProject
);


// DELETE PROJECT
router.delete(
    "/:id",
    projectController.deleteProject
);

module.exports = router;