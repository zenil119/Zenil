// repositories/task.repository.js

const pool =
    require("../config/db");

const createTask = async (
    payload,
    user_id
) => {

    const query = `
        INSERT INTO tasks
        (
            board_id,
            title,
            description,
            priority,
            status,
            assigned_to,
            due_date,
            created_by
        )
        VALUES
        (
            $1, $2, $3, $4,
            $5, $6, $7, $8
        )
        RETURNING *
    `;

    const values = [
        payload.board_id,
        payload.title,
        payload.description,
        payload.priority,
        payload.status,
        payload.assigned_to,
        payload.due_date,
        user_id
    ];

    const { rows } =
        await pool.query(query, values);

    return rows[0];
};

const getTasks = async (
    board_id
) => {

    const query = `
        SELECT *
        FROM tasks
        WHERE board_id = $1
        ORDER BY position ASC
    `;

    const { rows } =
        await pool.query(query, [board_id]);

    return rows;
};

const getTaskById = async (
    id
) => {

    const query = `
        SELECT *
        FROM tasks
        WHERE id = $1
    `;

    const { rows } =
        await pool.query(query, [id]);

    return rows[0];
};

const updateTask = async (
    id,
    payload
) => {

    /*
        ADD DYNAMIC UPDATE QUERY HERE
    */

    return true;
};

const deleteTask = async (
    id
) => {

    const query = `
        DELETE FROM tasks
        WHERE id = $1
        RETURNING *
    `;

    const { rows } =
        await pool.query(query, [id]);

    return rows[0];
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};