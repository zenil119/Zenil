const authService = require("../services/auth.service");
const { errorResponse, successResponse } = require("../utils/response");
const { registerValidation, loginValidation } = require("../validations/auth.validation")

const register = async (req, res) => {
    try {
        const { error } = registerValidation.validate(
            req.body
        );
        if (error) {
            return errorResponse(
                res,
                error.details[0].message,
                400
            )
        }

        const { email, password, name } = req.body;
        const user = await authService.registerUser(name, email, password)
        console.log('controller', user)

        return successResponse(
            res,
            "User registered successfully",
            user,
            200
        )
    } catch (err) {
        return errorResponse(
            res,
            err.message
        )
    }
}

const login = async (req, res) => {
    try {

        const { error } = loginValidation.validate(
            req.body
        )

        if (error) {
            return errorResponse(
                res,
                error.details[0].message,
                400
            )
        }

        const { email, password } = req.body

        const login = await authService.loginUser(email, password)

        return successResponse(
            res,
            "User login successfully",
            login,
            201
        )
    } catch (err) {
        return errorResponse(
            res,
            err.message
        )
    }

}

const profile =
    async (req, res) => {

        try {

            const user =
                await authService.getProfile(
                    req.user.id
                );

            return successResponse(
                res,
                "User profile details fetch successfully",
                user,
                200
            );

        } catch (err) {

            return errorResponse(
                res,
                err.message
            )
        }
    };

module.exports = {
    register,
    login,
    profile
}