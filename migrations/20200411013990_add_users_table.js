exports.up = (knex, Promise) => knex.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.string('avatar')
      table.string('name')
      table.string('email')
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
  
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users')
  }
  