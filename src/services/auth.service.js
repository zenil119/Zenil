const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const authRepository = require("../repositories/auth.repository");

const registerUser = async (
    name,
    email,
    password
) => {

    // check existing user

    const existingUser =
        await authRepository.findUserByEmail(email);
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
        await authRepository.createUser(
            name,
            email,
            hashedPassword
        );
    console.log('user ::>', user)

    return user;
};

const loginUser = async (email, password) => {
    const user = await authRepository.findUserByEmail(email);
    console.log('login:>> ', user)
    if (!user) {
        throw new Error(
            "Invalid credentials"
        );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error(
            "Invalid credentials"
        );
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: "1d"
        });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }
}
const getProfile =
    async (userId) => {

        const user =
            await authRepository.findUserById(
                userId
            );

        if (!user) {
            throw new Error(
                "User not found"
            );
        }

        return user;
    };

module.exports = {
    registerUser,
    loginUser,
    getProfile
}