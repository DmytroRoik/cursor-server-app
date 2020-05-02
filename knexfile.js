const config = require('config');

const obj = () => {
  const conf = Object.assign({}, config.get('database'));
  conf.migrations = {
    tableName: 'knex_migrations'
  };
  return conf;
};
module.exports = {
  development: obj()
};
