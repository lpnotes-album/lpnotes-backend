
exports.up = function(knex) {
  return(knex.schema
    .createTable('patrons', tbl => {
        tbl.increments('id');
        tbl.string('username',255).unique().notNullable();
        tbl.string('password').notNullable();
    }))
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('patrons');
};
