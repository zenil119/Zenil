// validations/task.validation.js

const Joi = require("joi");

const createTaskValidation =
    Joi.object({

        board_id: Joi.string()
            .uuid()
            .required(),

        title: Joi.string()
            .trim()
            .min(2)
            .max(255)
            .required(),

        description: Joi.string()
            .allow("")
            .optional(),

        priority: Joi.string()
            .valid(
                "low",
                "medium",
                "high"
            )
            .optional(),

        status: Joi.string()
            .valid(
                "todo",
                "in_progress",
                "done"
            )
            .optional(),

        assigned_to: Joi.string()
            .uuid()
            .allow(null)
            .optional(),

        due_date: Joi.date()
            .optional()

    });

const updateTaskValidation =
    Joi.object({

        title: Joi.string()
            .trim()
            .min(2)
            .max(255)
            .optional(),

        description: Joi.string()
            .allow("")
            .optional(),

        priority: Joi.string()
            .valid(
                "low",
                "medium",
                "high"
            )
            .optional(),

        status: Joi.string()
            .valid(
                "todo",
                "in_progress",
                "done"
            )
            .optional(),

        assigned_to: Joi.string()
            .uuid()
            .allow(null)
            .optional(),

        due_date: Joi.date()
            .allow(null)
            .optional()

    })
    .min(1);

const reorderTaskValidation =
    Joi.object({

        task_id: Joi.string()
            .uuid()
            .required(),

        board_id: Joi.string()
            .uuid()
            .required(),

        source_position: Joi.number()
            .required(),

        destination_position: Joi.number()
            .required()

    });

const moveTaskValidation =
    Joi.object({

        task_id: Joi.string()
            .uuid()
            .required(),

        source_board_id: Joi.string()
            .uuid()
            .required(),

        destination_board_id: Joi.string()
            .uuid()
            .required(),

        source_position: Joi.number()
            .required(),

        destination_position: Joi.number()
            .required()

    });

module.exports = {
    createTaskValidation,
    updateTaskValidation,
    reorderTaskValidation,
    moveTaskValidation
};