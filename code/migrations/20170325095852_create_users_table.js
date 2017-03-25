
exports.up = function (knex, Promise) {
  return knex.schema.createTable('repos2', function (table) {
    table.string('reponame')
    table.string('username')
    table.integer('stargazers')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('repos')
}
