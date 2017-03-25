
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('repos2', function (table) {
    table.string('name')
    table.string('owner')
    table.primary(['name', 'owner'])

    table.integer('stargazers_count')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('repos')
}
