
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('user', function (table) {
            table.increments('id')
            table.string('username', 50).notNullable()
            table.string('password', 255).notNullable()
            table.string('email', 255).notNullable()
            table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6))
        })
}

exports.down = function(knex, Promise) {
  
};
