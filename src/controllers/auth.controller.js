const { registerUser, loginUser, getProfile } = require("../services/auth.service");
const { registerValidation, loginValidation } = require("../validations/auth.validation")

const register = async (req, res) => {
    try {
        const { error } = registerValidation.validate(
            req.body
        );
        if (error) {
            return res.status(400).json({
                success: false,
                message:
                    error.details[0].message,
            });
        }

        const { email, password, name } = req.body;
        const user = await registerUser(name, email, password)
        console.log('controller', user)

        return res.status(201).json({
            success: true,
            message:
                "User registered successfully",
            data: user,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const login = async (req, res) => {
    try {

        const { error } = loginValidation.validate(
            req.body
        )

        if (error) {
            return res.status(400).json({
                success: false,
                message:
                    error.details[0].message,
            });
        }

        const { email, password } = req.body

        const login = await loginUser(email, password)

        return res.status(201).json({
            success: true,
            message:
                "User login successfully",
            data: login,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}

const profile =
    async (req, res) => {

        try {

            const user =
                await getProfile(
                    req.user.id
                );

            return res.status(200).json({
                success: true,
                data: user,
            });

        } catch (err) {

            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    };

module.exports = {
    register,
    login,
    profile
}