// validations/label.validation.js

const Joi = require("joi");

const createLabelValidation =
    Joi.object({

        project_id: Joi.string()
            .uuid()
            .required(),

        name: Joi.string()
            .trim()
            .min(2)
            .max(50)
            .required(),

        color: Joi.string()
            .trim()
            .optional()

    });

const updateLabelValidation =
    Joi.object({

        name: Joi.string()
            .trim()
            .min(2)
            .max(50)
            .optional(),

        color: Joi.string()
            .trim()
            .optional()

    })
    .min(1);

const assignLabelValidation =
    Joi.object({

        task_id: Joi.string()
            .uuid()
            .required(),

        label_id: Joi.string()
            .uuid()
            .required()

    });

module.exports = {
    createLabelValidation,
    updateLabelValidation,
    assignLabelValidation
};