
exports.up = function(knex, Promise) {
  return knex.schema.table('repos', (table) => {
    table.string('url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('repos', (table) => {
    table.dropColumn('url');
  });
};
