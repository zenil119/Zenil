const projectRepository =
    require("../repositories/project.repository");

const createProject = async (
    name,
    description,
    user_id
) => {

    const isSameNameProject =
        await projectRepository.findProjectByname(
            name,
            user_id
        );

    if (isSameNameProject) {

        throw {
            message:
                "Project name already exists",

            statusCode: 409
        };
    }

    return await projectRepository.createProject(
        name,
        description,
        user_id
    );
};

const getProjects = async (
    user_id
) => {

    return await projectRepository.getProjects(
        user_id
    );
};

const getProjectById = async (
    id,
    user_id
) => {

    const project =
        await projectRepository.getProjectById(
            id,
            user_id
        );

    if (!project) {

        throw {
            message: "Project not found",
            statusCode: 404
        };
    }

    return project;
};

const updateProject = async (
    id,
    name,
    description,
    user_id
) => {

    const existingProject =
        await projectRepository.getProjectById(
            id,
            user_id
        );

    if (!existingProject) {

        throw {
            message: "Project not found",
            statusCode: 404
        };
    }

    return await projectRepository.updateProject(
        id,
        name,
        description,
        user_id
    );
};

const deleteProject = async (
    id,
    user_id
) => {

    const existingProject =
        await projectRepository.getProjectById(
            id,
            user_id
        );

    if (!existingProject) {

        throw {
            message: "Project not found",
            statusCode: 404
        };
    }

    return await projectRepository.deleteProject(
        id,
        user_id
    );
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
};