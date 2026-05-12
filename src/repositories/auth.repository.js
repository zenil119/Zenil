const pool = require("../config/db")

const createUser = async (
    name,
    email,
    password
) => {

    const query = `
        insert into users (
            name, email, password
        ) values 
         ($1,$2,$3) returning id, name, email, role 
    `
    const values = [name, email, password]

    const result = await pool.query(query, values)
    return result.rows[0];
}

const findUserByEmail = async (email) => {
    const query = `select id, email, password, role from users where email = $1`
    const result = await pool.query(query, [email]);
    if (result.rows.length === 0) {
        return null;
    }
    return result?.rows[0]
}

const findUserById =
    async (id) => {

        const query = `
    SELECT
      id,
      name,
      email,
      role
    FROM users
    WHERE id = $1
  `;

        const result =
            await pool.query(
                query,
                [id]
            );

        return result.rows[0] || null;
    };

module.exports = {
    createUser,
    findUserByEmail,
    findUserById
}