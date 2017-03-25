
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('repos', function (table) {
      table.string('reponame')
      table.string('username')
      table.integer('stargazers')
    }).then(function () {
      return knex.schema.dropTableIfExists('repos').then(function () {
        console.log('droped')
      })
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('repos')
    .then(function () {})
  ])
}
