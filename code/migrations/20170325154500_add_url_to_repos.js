
exports.up = function(knex, Promise) {
    return knex.schema.table('repos', function(t) {
        t.string('url')
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('repos', function(t) {
        t.dropColumn('url');
    });
};