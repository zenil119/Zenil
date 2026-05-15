const pool =
    require("../config/db");

const createBoard = async (
    project_id,
    name,
    maxPos
) => {

    const query = `
        INSERT INTO boards
        (
            project_id,
            name,
            position
        )
        VALUES ($1, $2, $3)
        RETURNING *
    `;

    const { rows } =
        await pool.query(query, [
            project_id,
            name,
            maxPos
        ]);

    return rows[0];
};

const getBoards = async (
    project_id
) => {

    const query = `
        SELECT *
        FROM boards
        WHERE project_id = $1
        ORDER BY created_at DESC
    `;

    const { rows } =
        await pool.query(query, [
            project_id
        ]);

    return rows;
};

const getBoardById = async (
    id, user_id
) => {

    const query = `
        SELECT *
        FROM boards
        WHERE id = $1
    `;

    const { rows } =
        await pool.query(query, [id]);

    return rows[0];
};

const updateBoard = async (
    id,
    payload
) => {

    const fields = [];

    const values = [];

    let index = 1;

    for (const key in payload) {

        fields.push(
            `${key} = $${index}`
        );

        values.push(payload[key]);

        index++;
    }

    values.push(id);

    const query = `
        UPDATE boards
        SET ${fields.join(", ")}
        WHERE id = $${index}
        RETURNING *
    `;

    const { rows } =
        await pool.query(query, values);

    return rows[0];
};

const deleteBoard = async (
    id
) => {

    const query = `
        DELETE FROM boards
        WHERE id = $1
        RETURNING *
    `;

    const { rows } =
        await pool.query(query, [id]);

    return rows[0];
};

const getBoardByName = async (name) => {
    const query = `select name from boards where name = $1`
    const values = [name]
    const { rows } =
        await pool.query(query, [
            name
        ]);

    return rows[0];
}

const getMaxBoardPosion = async (project_id) => {
    const query = `select Max(position) from boards where project_id = $1`
    const values = [project_id]

    const { rows } = await pool.query(query, values)
    return rows[0]
}

const getTotalBoardCount = async (project_id) => {
    const query = `select count(*) from boards where project_id = $1`
    const values = [project_id]

    const { rows } = await pool.query(query, values)
    return rows[0]
}
const moveBoardsUp = async (
    project_id,
    current_position,
    new_position
) => {
console.log('called')
    const query = `
        UPDATE boards
        SET position = position + 1
        WHERE project_id = $1
        AND position >= $2
        AND position < $3
    `;

    // 1  >= 1  1 < 3  update
    // 2  >= 1   2 < 3 yes
    // 3 >=  1   3 < 3
    await pool.query(query, [
        project_id,
        new_position,
        current_position
    ]);
};

const moveBoardsDown = async (
    project_id,
    current_position,
    new_position
) => {

    const query = `
        UPDATE boards
        SET position = position - 1
        WHERE project_id = $1
        AND position <= $2
        AND position > $3
    `;

    await pool.query(query, [
        project_id,
        new_position,
        current_position
    ]);
};

module.exports = {
    createBoard,
    getBoards,
    getBoardById,
    updateBoard,
    deleteBoard,
    getBoardByName,
    getMaxBoardPosion,
    getTotalBoardCount,
    moveBoardsUp,
    moveBoardsDown
};