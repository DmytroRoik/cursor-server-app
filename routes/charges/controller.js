const ChargesModule = require('../../modules/charges');
const apiBuilder = require('../../helpers/apiBuilder');
const getError = require('../../helpers/error-maker');

const getAll = async (req, res) => {
    const { type, from } = req.query;
    try {
        const data = await new ChargesModule().getAll(type, from);   
        return apiBuilder.builder(res, { ...data });
    } catch (err) {
        return apiBuilder.builder(res, getError(err, 400));
    } 
}

const createCharge = async (req, res) => {
    try {
        const charge = await new ChargesModule().create(req.body);
        return apiBuilder.builder(res, { ...charge });
    } catch (err) {
        return apiBuilder.builder(res, getError(err, 400));
    } 
}

const editCharge = async (req, res) => {
    try {
        const charge = await new ChargesModule().edit(req.body);
        return res.send({ ...charge });
    } catch (err) {
        return apiBuilder.builder(res, getError(err, 400));
    } 
}

const removeCharge = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await new ChargesModule().remove(id);
        return apiBuilder.builder(res, {
            message: 'Successfully removed',
            totalBalance: result
        });
    } catch (err) {
        return apiBuilder.builder(res, getError(err, 400))
    }
} 

module.exports = {
    getAll,
    createCharge,
    editCharge,
    removeCharge
};