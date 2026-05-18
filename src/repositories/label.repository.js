// repositories/label.repository.js

const pool =
    require("../config/db");

const createLabel = async (
    payload,
    user_id
) => {

    const query = `
        INSERT INTO labels
        (
            project_id,
            name,
            color,
            created_by
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    const values = [
        payload.project_id,
        payload.name,
        payload.color,
        user_id
    ];

    const { rows } =
        await pool.query(query, values);

    return rows[0];
};

const getLabels = async (
    project_id, search
) => {
    let query = ``

    query = `
        SELECT *
        FROM labels
        WHERE project_id = $1
    `;
    const values = [project_id]
    let index = 2

    if (search) {
        query += `name ILIKE $${index}`
        values.push(`%${search}%`)
        index++
    }

    const { rows } =
        await pool.query(query, values);

    query += `ORDER BY created_at DESC`

    return rows;
};

const getLabelById = async (
    id
) => {

    const query = `
        SELECT *
        FROM labels
        WHERE id = $1
    `;

    const { rows } =
        await pool.query(query, [id]);

    return rows[0];
};

const updateLabel = async (
    id,
    payload
) => {

    /*
        ADD DYNAMIC UPDATE QUERY HERE
    */

    return true;
};

const deleteLabel = async (
    id
) => {

    const query = `
        DELETE FROM labels
        WHERE id = $1
        RETURNING *
    `;

    const { rows } =
        await pool.query(query, [id]);

    return rows[0];
};

const assignLabelToTask = async (
    payload
) => {

    const query = `
        INSERT INTO task_labels
        (
            task_id,
            label_id
        )
        VALUES ($1, $2)
        RETURNING *
    `;

    const values = [
        payload.task_id,
        payload.label_id
    ];

    const { rows } =
        await pool.query(query, values);

    return rows[0];
};

const removeLabelFromTask = async (
    payload
) => {

    const query = `
        DELETE FROM task_labels
        WHERE task_id = $1
        AND label_id = $2
        RETURNING *
    `;

    const values = [
        payload.task_id,
        payload.label_id
    ];

    const { rows } =
        await pool.query(query, values);

    return rows[0];
};

module.exports = {
    createLabel,
    getLabels,
    getLabelById,
    updateLabel,
    deleteLabel,
    assignLabelToTask,
    removeLabelFromTask
}; s