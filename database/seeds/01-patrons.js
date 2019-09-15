
exports.seed = function(knex) {
  return knex('patrons').insert([
    {username: 'Arthur', password:'changeme'},
    {username: 'Linda', password:'password'},
]);
};