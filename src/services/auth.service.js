const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const {
    createUser,
    findUserByEmail,
    findUserById,
} = require("../repositories/auth.repository");

const registerUser = async (
    name,
    email,
    password
) => {

    // check existing user

    const existingUser =
        await findUserByEmail(email);
    if (existingUser) {
        throw new Error(
            "Email already exists"
        );
    }

    // hash password

    const hashedPassword =
        await bcrypt.hash(password, 10);

    // create user

    const user =
        await createUser(
            name,
            email,
            hashedPassword
        );
    console.log('user ::>', user)

    return user;
};

module.exports = {
    registerUser
}