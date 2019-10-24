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

  testing: {
      client: 'sqlite3',
      connection: { filename: './database/testing.db3' },
      useNullAsDefault: true,
      migrations: {
        directory: './database/migrations',
        tableName: 'dbmigrations',
      },
      seeds: { directory: './database/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
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
