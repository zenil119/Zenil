const projectService =
    require("../services/project.service");

const {
    successResponse
} = require("../utils/response");

const {
    createProjectValidation,
    updateProjectValidation
} = require("../validations/project.validation");

const createProject = async (
    req,
    res,
    next
) => {

    try {

        const { error } =
            createProjectValidation.validate(
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
            name,
            description
        } = req.body;

        const project =
            await projectService.createProject(
                name,
                description,
                req.user.id
            );

        return successResponse(
            res,
            "Project created successfully",
            project,
            201
        );

    } catch (err) {

        next(err);

    }
};

const getProjects = async (
    req,
    res,
    next
) => {

    try {

        const projects =
            await projectService.getProjects(
                req.user.id
            );

        return successResponse(
            res,
            "Projects fetched successfully",
            projects
        );

    } catch (err) {

        next(err);

    }
};

const getProjectById = async (
    req,
    res,
    next
) => {

    try {

        const project =
            await projectService.getProjectById(
                req.params.id,
                req.user.id
            );

        return successResponse(
            res,
            "Project fetched successfully",
            project
        );

    } catch (err) {

        next(err);

    }
};

const updateProject = async (
    req,
    res,
    next
) => {

    try {

        const { error } =
            updateProjectValidation.validate(
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
            name,
            description
        } = req.body;

        const project =
            await projectService.updateProject(
                req.params.id,
                name,
                description,
                req.user.id
            );

        return successResponse(
            res,
            "Project updated successfully",
            project
        );

    } catch (err) {

        next(err);

    }
};

const deleteProject = async (
    req,
    res,
    next
) => {

    try {

        await projectService.deleteProject(
            req.params.id,
            req.user.id
        );

        return successResponse(
            res,
            "Project deleted successfully"
        );

    } catch (err) {

        next(err);

    }
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
};