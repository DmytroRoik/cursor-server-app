const validator = require('joi');
const BaseModel = require('./_base_model');
const { createCategory, editCategory } = require('./validator');

class Category extends BaseModel {
  static get tableName() {
    return 'categories';
  }

  getAll() {
    return Category
        .query()
        .select('*');
  }

  getById(id) {
    if (isNaN(id)|| id <= 0) { throw new Error('Invalid id'); }
    return Category.query().findById(id);
  }

  create(data) {
    const { error } = validator.validate(data, createCategory);
    if (error) {
        throw new Error('Invalid data');
    }
    return Category
      .query()
      .insert(data)
      .returning('*');
  }

edit(data) {
    const { error } = validator.validate(data, editCategory);
    if (error) {
        throw new Error('Invalid data');
    }
    
    return Category
        .query()
        .patchAndFetchById(data.id, {
            ...data,
            updatedAt: new Date()
        })
        .returning('*');
  }

remove(id) {
    if (isNaN(id)|| id <= 0) { throw new Error('Invalid id'); }
    return Category.query().deleteById(id);
  }
}

module.exports = Category;
