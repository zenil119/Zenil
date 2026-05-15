const Joi = require("joi");

const createBoardValidation =
    Joi.object({

        project_id: Joi.string()
            .uuid()
            .required(),

        name: Joi.string()
            .trim()
            .min(2)
            .max(100)
            .required()

    });

const updateBoardValidation =
    Joi.object({

        name: Joi.string()
            .trim()
            .min(2)
            .max(100)
            .optional(),
        position: Joi.number().max(100).optional()
    });

const boardReorderValidation =
    Joi.object({

        project_id: Joi.string()
            .uuid()
            .required(),

        new_position: Joi.number()
            .min(1)
            .required()

    });

module.exports = {
    createBoardValidation,
    updateBoardValidation,
    boardReorderValidation
};