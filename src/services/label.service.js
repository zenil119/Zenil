// services/label.service.js

const labelRepository =
    require("../repositories/label.repository");

const createLabel = async (
    payload,
    user_id
) => {

    /*
        ADD LOGIC HERE

        ✅ project ownership validation

        ✅ duplicate label name check

        ✅ color validation

        ✅ same project duplicate prevention
    */

    return await labelRepository.createLabel(
        payload,
        user_id
    );
};

const getLabels = async (
    project_id,
    user_id,
    queryParams
) => {
    const {search } = queryParams

    /*
        ADD LOGIC HERE

        ✅ ownership validation

        ✅ sorting

        ✅ search filter
    */

    return await labelRepository.getLabels(
        project_id, search
    );
};

const getLabelById = async (
    id,
    user_id
) => {

    /*
        ADD LOGIC HERE

        ✅ ownership validation
    */

    const label =
        await labelRepository.getLabelById(id);

    if (!label) {

        throw {
            message: "Label not found",
            statusCode: 404
        };
    }

    return label;
};

const updateLabel = async (
    id,
    payload,
    user_id
) => {

    /*
        ADD LOGIC HERE

        ✅ ownership validation

        ✅ dynamic partial update

        ✅ duplicate label validation

        ✅ color validation
    */

    return await labelRepository.updateLabel(
        id,
        payload
    );
};

const deleteLabel = async (
    id,
    user_id
) => {

    /*
        ADD LOGIC HERE

        ✅ ownership validation

        ✅ delete mapping validations

        ✅ transaction if needed
    */

    return await labelRepository.deleteLabel(id);
};

const assignLabelToTask = async (
    payload,
    user_id
) => {

    /*
        ADD LOGIC HERE

        ✅ task exists validation

        ✅ label exists validation

        ✅ task ownership validation

        ✅ same project validation

        ✅ duplicate mapping prevention

        ✅ prevent assigning same label twice
    */

    return await labelRepository.assignLabelToTask(
        payload
    );
};

const removeLabelFromTask = async (
    payload,
    user_id
) => {

    /*
        ADD LOGIC HERE

        ✅ ownership validation

        ✅ mapping exists validation
    */

    return await labelRepository.removeLabelFromTask(
        payload
    );
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