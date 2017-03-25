
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('reposs', function (table) {
      table.string('reponame')
      table.string('username')
      table.integer('stargazers')
    }).then(function () {
      return knex.schema.dropTableIfExists('reposs').then(function () {
        console.log('droped')
      })
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('reposs')
    .then(function (val) { return val })
  ])
}
