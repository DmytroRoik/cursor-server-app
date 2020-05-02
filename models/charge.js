const validator = require('joi');
const BaseModel = require('./_base_model');
const { createCharge, editCharge } = require('./validator');
class Charge extends BaseModel {
  static get tableName() {
    return 'charges';
  }

  async getAll(type = 'income', options = {}) {
    if(!['income', 'charge'].includes(type)) {
      throw new Error('Invalid type');
    }
    if (options.startFrom) {
      return Charge
        .query()
        .where({ type })
        .whereRaw(`date > '${new Date(Number(options.startFrom)).toISOString()}'`)
        .select('*');
    }

    return Charge
        .query()
        .where({ type })
        .select('*');
  }

  getById(id) {
    if (isNaN(id)|| id <= 0) { throw new Error('Invalid id'); }
    return Charge
        .query()
        .findById(id)
        .select('*');
  }

  create(data) {
    const { error } = validator.validate(data, createCharge);
    if (error) {
        throw new Error('Invalid data');
    }
    data.date = new Date(data.date);
    return Charge
        .query()
        .insert(data)
        .returning('*');
  }

edit(data) {
    const { error } = validator.validate(data, editCharge);
    if (error) {
        throw new Error('Invalid data');
    }
    data.date = new Date(data.date);
    return Charge
        .query()
        .patchAndFetchById(data.id, data)
        .returning('*');
  }


  async getTotalBalance() {
    const incomeSum = (await Charge.query().sum('money').where('type', 'income'))[0].sum;
    const chargeSum = (await Charge.query().sum('money').where('type', 'charge'))[0].sum;
    return parseFloat(incomeSum || 0) - parseFloat(chargeSum || 0); 
  }

remove(id) {
    if (isNaN(id)|| id <= 0) { throw new Error('Invalid id'); }
    return Charge.query().deleteById(id);
  }

removeByCategory(categoryId) {
  if (isNaN(categoryId)|| categoryId <= 0) { throw new Error('Invalid id'); }
  return Charge.query().where('category_id', categoryId ).delete();
}
}

module.exports = Charge;
