exports.up = (knex) => {
    return knex.raw('alter TABLE charges ALTER COLUMN money TYPE float')
  }
  
  exports.down = knex => {

  };
  