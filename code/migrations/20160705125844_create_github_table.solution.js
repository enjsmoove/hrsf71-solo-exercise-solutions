
exports.up = function(knex, Promise) {
  return knex.schema.createTable('repos', function (table) {

    table.string('name');
    table.string('owner');
    table.primary(['name', 'owner']);

    table.integer('stargazers_count');
  });
  knex.schema.alterTable('repos', function(table) {
    table.unique('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('repos');
};
