const pool =
    require("../config/db");

const createProject = async (
    name,
    description,
    user_id
) => {

    const query = `
        INSERT INTO projects
        (
            name,
            description,
            created_by
        )
        VALUES ($1, $2, $3)
        RETURNING *
    `;

    const values = [
        name,
        description,
        user_id
    ];

    const { rows } =
        await pool.query(query, values);

    return rows[0];
};

const findProjectByname = async (
    name,
    user_id
) => {

    const query = `
        SELECT *
        FROM projects
        WHERE name = $1
        AND created_by = $2
    `;

    const { rows } =
        await pool.query(query, [
            name,
            user_id
        ]);

    return rows[0];
};

const getProjects = async (
    user_id
) => {

    const query = `
        SELECT *
        FROM projects
        WHERE created_by = $1
        ORDER BY id DESC
    `;

    const { rows } =
        await pool.query(query, [
            user_id
        ]);

    return rows;
};

const getProjectById = async (
    id,
    user_id
) => {

    const query = `
        SELECT *
        FROM projects
        WHERE id = $1
        AND created_by = $2
    `;

    const { rows } =
        await pool.query(query, [
            id,
            user_id
        ]);

    return rows[0];
};

const updateProject = async (
    id,
    name,
    description,
    user_id
) => {

    const query = `
        UPDATE projects
        SET
            name = $1,
            description = $2
        WHERE id = $3
        AND created_by = $4
        RETURNING *
    `;

    const values = [
        name,
        description,
        id,
        user_id
    ];

    const { rows } =
        await pool.query(query, values);

    return rows[0];
};

const deleteProject = async (
    id,
    user_id
) => {

    const query = `
        DELETE FROM projects
        WHERE id = $1
        AND created_by = $2
        RETURNING *
    `;

    const { rows } =
        await pool.query(query, [
            id,
            user_id
        ]);

    return rows[0];
};

module.exports = {
    createProject,
    findProjectByname,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
};