
exports.up = function(knex, Promise) {
  return knex.schema.createTable('repos', (table) => {

    table.string('name');
    table.string('owner');
    table.primary(['name', 'owner']); // both of these are primary

    table.integer('stargazers_count');
    table.string('url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('repos');
};
