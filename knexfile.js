// Update with your config settings.
require('dotenv').config()

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASSWD,
      database: process.env.DBNAME,
    },
    migrations: {
      directory: __dirname + '/components/migrations',
    },
    seeds: {
      directory: __dirname + '/components/seeds'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASSWD,
      database: process.env.DBNAME,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: __dirname + '/components/migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASSWD,
      database: process.env.DBNAME,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: __dirname + '/components/migrations'
    }
  }

};
