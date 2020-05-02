exports.up = (knex) => {
    return knex.schema.createTable('charges', (table) => {
      table.increments('id').primary()
      table.integer('category_id').unsigned().references('id').inTable('categories');
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable().defaultTo(1);
      table.string('description')
      table.integer('money').notNullable().defaultTo(0)
      table.timestamp('date').notNullable().defaultTo(knex.fn.now())
      table.string('type').notNullable()
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
  }
  
  exports.down = (knex) => {
    return knex.schema.dropTable('charges')
  }
  