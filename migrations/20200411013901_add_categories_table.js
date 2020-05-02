exports.up = (knex, Promise) => {
    return knex.schema.createTable('categories', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('description')
      table.integer('icon_id').references('id').inTable('icons').notNullable()
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
  }
  
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable('categories')
  }
  