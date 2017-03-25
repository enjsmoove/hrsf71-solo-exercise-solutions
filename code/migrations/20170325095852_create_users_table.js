
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('repos', function (table) {
      table.string('reponame')
      table.string('username')
      table.integer('stargazers')
    }).then(function () {
      return knex('repos').insert([
        {reponame: 'A', username: 'A', stargazers: 0},
        {reponame: 'B', username: 'BB', stargazers: 0},
        {reponame: 'C', username: 'CCC', stargazers: 0},
        {reponame: 'D', username: 'DDDD', stargazers: 0}
      ])
    })
  ])
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('repos')
}
