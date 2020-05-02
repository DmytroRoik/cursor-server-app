exports.up = (knex, Promise) => {
    return knex.schema.createTable('icons', (table) => {
      table.increments('id').primary()
      table.string('class').notNullable()
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
  }
  
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('icons')
  }
  