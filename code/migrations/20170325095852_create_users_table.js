
exports.up = function (knex, Promise) {
  return knex.schema.createTable('repos', function (table) {
    table.string('reponame')
    table.string('username')
    table.integer('stargazers')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('repos')
}
