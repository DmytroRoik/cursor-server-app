const BaseModel = require('./_base_model');

class Icon extends BaseModel {

  static get tableName() {
    return 'icons';
  }

  getAll() {
    return Icon
      .query()
      .select('*');
  }

  getById(id) {
    if (isNaN(id)|| id <= 0) { throw new Error('Invalid id'); }
    return Icon.query().findById(id);
  }
}

module.exports = Icon;
