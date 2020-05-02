exports.up = (knex) => {
    return knex.schema.alterTable('users', (table) => {
      table.integer('critical_budget').default(0);
      table.boolean('notify').notNullable().default(false);
    });
  }
  
  exports.down = knex => {
    return knex.schema.table('users', (table) => {
      table.dropColumn('critical_budget');
      table.dropColumn('notify');
    })
  };
  