// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'lambda123',
      database: 'kickstarter'
    },
    migrations: {
      directory: './dataBase/migrations',
    },
    seeds: {
      directory: './dataBase/seeds',
    },
    pool: {
      min: 2, 
      max: 10,
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './dataBase/migrations',
    },
    seeds: {
      directory: './dataBase/seeds',
    },
  }

};
