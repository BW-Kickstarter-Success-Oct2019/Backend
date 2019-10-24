
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(
        {
          username: 'matthew', 
          password: '123', 
          email: 'demo@demo.com' },
      );
    });
};
