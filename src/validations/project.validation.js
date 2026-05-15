const Joi = require("joi");

const createProjectValidation =
    Joi.object({

        name: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .required(),

        description: Joi.string()
            .allow("")
            .optional()

    });

const updateProjectValidation =
    Joi.object({

        name: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .optional(),

        description: Joi.string()
            .allow("")
            .optional()

    });

module.exports = {
    createProjectValidation,
    updateProjectValidation
};