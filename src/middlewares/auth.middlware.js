const jwt = require("jsonwebtoken");

const {
    errorResponse
} = require("../utils/response");

const authMiddleware = (
    req,
    res,
    next
) => {

    try {

        const authHeader =
            req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {

            return errorResponse(
                res,
                "Access token required",
                401
            );
        }

        const token =
            authHeader.split(" ")[1];

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_ACCESS_SECRET
            );

        req.user = decoded;

        next();

    } catch (error) {

        return errorResponse(
            res,
            "Invalid or expired token",
            401
        );
    }
};

module.exports =
    authMiddleware;