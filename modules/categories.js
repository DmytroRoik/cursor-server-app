const CategoryModel = require('../models/category');
const IconModel = require('../models/icon');
const ChargeModel = require('../models/charge');


class Category {
    async getAll() {
        const categories = await new CategoryModel().getAll();
        const result = categories.map(async (el) => {
            const icon = await new IconModel().getById(el.iconId);
            return {
                id: el.id,
                name: el.name,
                description: el.description,
                createdAt: el.createdAt,
                updatedAt: el.updatedAt,
                icon: icon || {}
            }
        });
        const data = await Promise.all(result);
        return { data, count: categories.length };
    }

    async getById(id) {
        const category = await new CategoryModel().getById(id);
        const icon = await new IconModel().getById(category.iconId);
        return {
            id: category.id,
            name: category.name,
            description: category.description,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
            icon
        }
    }

    async removeById(id) {
        try {
            await new ChargeModel().removeByCategory(id);
            await new CategoryModel().remove(id);
        } catch(err) {
            throw new Error('Charge does`t exist');
        }
    }

    async create(data) {
        try {
            const { id } = await new CategoryModel().create(data);
            return this.getById(id);
        } catch(err) {
            throw new Error(err);
        }
    }

    async edit(data) {
        try {
            const result = await new CategoryModel().edit(data);
            if (!result) {
                throw new Error('Category doesn`t exist');
            }
            return this.getById(result.id);
        } catch(err) {
            throw new Error(err);
        }
    }
}

module.exports = Category;