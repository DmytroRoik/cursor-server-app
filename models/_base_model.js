const config = require('config');
const knex = require('knex');
const loDash = require('lodash');
const objection = require('objection');
/**
 * Initializing flag
 * @type {boolean}
 */
let inited;

const outputName = (key) => {
  return loDash.camelCase(key);
};

const inputName = (key) => {
  return loDash.snakeCase(key);
};
const outputMapper = (json) => {
  return loDash.mapKeys(json, (value, key) => outputName(key));
};

const inputMapper = (json) => {
  return loDash.mapKeys(json, (value, key) => inputName(key));
};

const init = () => {
  inited = false;
  const { Model } = objection;
  const _knex = knex(config.get('database'));
  Model.knex(_knex);
  class BaseModel extends Model {
    fillableFields() {
      return [];
    }

    $formatDatabaseJson(json) {
      json = super.$formatDatabaseJson(json);
      return inputMapper(json);
    }

    $parseDatabaseJson(json) {
      json = outputMapper(json);
      return super.$parseDatabaseJson(json);
    }

    saveItem(itemData) {
      const data = loDash.reduce(this.fillableFields(), (result, value) => {
        result[value] = itemData[value];
        return result;
      }, {});

      return this.constructor.query()
        .insert(data)
        .returning('*')
        .catch(console.error);
    }

    removeItem(type, value) {
      return this.constructor.query()
        .delete()
        .where(type, value)
        .catch(console.error);
    }

    getItemBy(type, value) {
      return this.constructor.query()
        .where(type, value)
        .returning('*')
        .limit(1)
        .then(n => n[0])
        .catch(console.error);
    }

    getItemsBy(type, value) {
      return this.constructor.query()
        .where(type, value)
        .returning('*')
        .catch(console.error);
    }

    getItemsByPage(params, page, perPage) {
      const start = (page - 1) * perPage;
      return this.constructor.query()
        .where(params)
        .then((n) => {
          const count = n.length;
          const data = n.slice(start, +start + +perPage);
          return { data, count };
        })
        .catch(console.error);
    }
  }
  objection.Model = BaseModel;
  inited = true;
};

const getModel = () => {
  if (!inited) {
    if (inited !== false) {
      init();
    }
    while (!inited) {
    }
  }
  return objection.Model;
};

module.exports = getModel();
