const { registerUser } = require("../services/auth.service");
const { registerValidation } = require("../validations/auth.validation")

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
        const user = await registerUser(name, password, email)
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

module.exports = {
    register
}