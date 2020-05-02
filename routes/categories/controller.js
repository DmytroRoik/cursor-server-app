const Category = require('../../modules/categories');
const apiBuilder = require('../../helpers/apiBuilder');
const getError = require('../../helpers/error-maker');

const getAll = async (req, res) => {
    const data = await new Category().getAll();   
    return apiBuilder.builder(res, { ...data });
}

const createCategory = async (req, res) => {
    try {
        const category = await new Category().create(req.body);
        return apiBuilder.builder(res, { data: category });
    } catch (err) {
        return apiBuilder.builder(res, getError(err, 400));
    } 
}

const editCategory = async (req, res) => {
    try {
        const category = await new Category().edit(req.body);
        return res.send({ data: category });
    } catch (err) {
        return apiBuilder.builder(res, getError(err, 400));
    } 
}

const removeCategory = async (req, res) => {
    try {
        const { id } = req.query;
        await new Category().removeById(id);
        return apiBuilder.builder(res, { message: 'Successfully removed' });
    } catch (err) {
        return apiBuilder.builder(res, getError(err, 400))
    }
} 

module.exports = {
    getAll,
    createCategory,
    editCategory,
    removeCategory
  };