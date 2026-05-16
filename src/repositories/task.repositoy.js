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
            created_by,
            position
        )
        VALUES
        (
            $1, $2, $3, $4,
            $5, $6, $7, $8, $9
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
        user_id,
        payload.position
    ];

    const { rows } =
        await pool.query(query, values);

    return rows[0];
};

const getTasks = async ({
    board_id,
    offset,
    limit,
    search,
    status,
    priority,
    sort_by,
    sort_order
}) => {

    let query = `
        SELECT *
        FROM tasks
        WHERE board_id = $1
    `;

    const values = [board_id];

    let index = 2;

    /*
        search
    */
    if (search) {

        query += `
            AND (
                title ILIKE $${index}
                OR description ILIKE $${index}
            )
        `;

        values.push(`%${search}%`);

        index++;

    }

    /*
        status filter
    */
    if (status) {

        query += `
            AND status = $${index}
        `;

        values.push(status);

        index++;

    }

    /*
        priority filter
    */
    if (priority) {

        query += `
            AND priority = $${index}
        `;

        values.push(priority);

        index++;

    }

    /*
        sorting
    */
    query += `
        ORDER BY ${sort_by} ${sort_order}
    `;

    /*
        pagination
    */
    query += `
        LIMIT $${index}
        OFFSET $${index + 1}
    `;

    values.push(limit);

    values.push(offset);

    const { rows } =
        await pool.query(query, values);

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

const getTaskByTitle = async (title) => {
    const query = `select title from tasks where title = $1`
    const values = [title]
    const { rows } = await pool.query(query, values)
    return rows && rows[0] || null
}

const maxtaskCount = async (board_id) => {
    const query = `select Max(position) from tasks where board_id = $1`;
    const values = [board_id]

    const { rows } = await pool.query(query, values);
    return rows[0];
}
module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getTaskByTitle,
    maxtaskCount
};