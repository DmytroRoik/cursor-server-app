const Joi = require('joi');

const createCategory = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    iconId: Joi.number().required()
});

const editCategory = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().optional(),
    iconId: Joi.number().required()
});

const createCharge = Joi.object({
    categoryId: Joi.number().required(),
    description: Joi.string().optional(),
    money: Joi.number().min(0).required(),
    date: Joi.number().required(),
    type: Joi.string().required().valid([
        'charge', 'income'])
});

const editCharge = Joi.object({
    id: Joi.number().required(),
    categoryId: Joi.number().required(),
    description: Joi.string().optional(),
    money: Joi.number().min(0).required(),
    date: Joi.number().required(),
    type: Joi.string().required().valid([
        'charge', 'income'])
});

const editUser = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    avatar: Joi.string().optional(),
    notify: Joi.boolean().optional(),
    criticalBudget: Joi.number().min(0).optional()
});

module.exports = {
    createCategory,
    editCategory,
    createCharge,
    editCharge,
    editUser
};
