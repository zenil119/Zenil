// repositories/task.repository.js

const pool =
    require("../config/db");
const { reorderTask } = require("../services/task.service");

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
    console.log("new deployment")

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

const reorderBoard = async (board_id, newPostion) => {
    const query = `update tasks set postion = position + 1 where board_id = $1 and postion >= $2 returning *`;
    const values = [board_id, newPostion]

    const { rows } = await pool.query(query, values)
    return rows[0]
}

const updateTaskDetails = async (board_id, task_id, newPostion) => {
    const query = `update tasks set board_id = $1, postion = $2 where task_id = $3 returning *`
    const values = [board_id, newPostion, task_id]

    await pool.query(query, values)
}

const reorderCurrentBoardTasks = async (board_id, postion) => {
    const query = `update tasks set position = position - 1 where board_id = $1 and postion > $2 returning *`;
    const values = [board_id, postion]

    await pool.query(query, values)

}

const sameBoardTaskReorderDown = async (board_id, newPostion, currentPosition) => {
    const query = `update tasks set position = position - 1 where board_id = $1 and position > $3 and position <= $2`;
    const values = [board_id, newPostion, currentPosition,];
    await pool.query(query, values)
}

const sameBoardTaskReorderUp = async (board_id, newPostion, currentPosition) => {
    const query = `select * from set postion + 1 where board_id = $1 and position >= $2 and postion < $3`;
    const values = [board_id, newPostion, currentPosition];

    await pool.query(query, values)
}

const createActivityLog = async (
    task_id,
    action_type,
    old_value,
    new_value,
    changed_by
) => {

    const query = `
        insert into activity_logs
        (
            task_id,
            action_type,
            old_value,
            new_value,
            changed_by
        )
        values ($1, $2, $3, $4, $5)
    `;

    const values = [
        task_id,
        action_type,
        JSON.stringify(old_value),
        JSON.stringify(new_value),
        changed_by
    ];

    await pool.query(query, values);
}

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getTaskByTitle,
    maxtaskCount,
    reorderBoard,
    updateTaskDetails,
    reorderCurrentBoardTasks,
    sameBoardTaskReorderDown,
    sameBoardTaskReorderUp,
    createActivityLog
};