exports.seed = function (knex, Promise) {
  return knex('users').insert([
    { id: 1, name: '', email: '', avatar: '' }
  ])
}
