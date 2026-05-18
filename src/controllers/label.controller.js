// controllers/label.controller.js

const labelService =
    require("../services/label.service");

const {
    successResponse
} = require("../utils/response");

const {
    createLabelValidation,
    updateLabelValidation,
    assignLabelValidation
} = require("../validations/label.validation");

const createLabel = async (
    req,
    res,
    next
) => {

    try {

        const { error } =
            createLabelValidation.validate(
                req.body
            );

        if (error) {

            throw {
                message:
                    error.details[0].message,

                statusCode: 400
            };
        }

        const label =
            await labelService.createLabel(
                req.body,
                req.user.id
            );

        return successResponse(
            res,
            "Label created successfully",
            label,
            201
        );

    } catch (err) {

        next(err);

    }
};

const getLabels = async (
    req,
    res,
    next
) => {

    try {

        const labels =
            await labelService.getLabels(
                req.params.project_id,
                req.user.id,
                req.query
            );

        return successResponse(
            res,
            "Labels fetched successfully",
            labels
        );

    } catch (err) {

        next(err);

    }
};

const getLabelById = async (
    req,
    res,
    next
) => {

    try {

        const label =
            await labelService.getLabelById(
                req.params.id,
                req.user.id
            );

        return successResponse(
            res,
            "Label fetched successfully",
            label
        );

    } catch (err) {

        next(err);

    }
};

const updateLabel = async (
    req,
    res,
    next
) => {

    try {

        const { error } =
            updateLabelValidation.validate(
                req.body
            );

        if (error) {

            throw {
                message:
                    error.details[0].message,

                statusCode: 400
            };
        }

        const label =
            await labelService.updateLabel(
                req.params.id,
                req.body,
                req.user.id
            );

        return successResponse(
            res,
            "Label updated successfully",
            label
        );

    } catch (err) {

        next(err);

    }
};

const deleteLabel = async (
    req,
    res,
    next
) => {

    try {

        await labelService.deleteLabel(
            req.params.id,
            req.user.id
        );

        return successResponse(
            res,
            "Label deleted successfully"
        );

    } catch (err) {

        next(err);

    }
};

const assignLabelToTask = async (
    req,
    res,
    next
) => {

    try {

        const { error } =
            assignLabelValidation.validate(
                req.body
            );

        if (error) {

            throw {
                message:
                    error.details[0].message,

                statusCode: 400
            };
        }

        const label =
            await labelService.assignLabelToTask(
                req.body,
                req.user.id
            );

        return successResponse(
            res,
            "Label assigned successfully",
            label
        );

    } catch (err) {

        next(err);

    }
};

const removeLabelFromTask = async (
    req,
    res,
    next
) => {

    try {

        const label =
            await labelService.removeLabelFromTask(
                req.body,
                req.user.id
            );

        return successResponse(
            res,
            "Label removed successfully",
            label
        );

    } catch (err) {

        next(err);

    }
};

module.exports = {
    createLabel,
    getLabels,
    getLabelById,
    updateLabel,
    deleteLabel,
    assignLabelToTask,
    removeLabelFromTask
};