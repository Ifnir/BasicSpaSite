module.exports = {
  db: {
    client: 'mysql',
    connection: {
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASSWD,
      database: process.env.DBNAME,
      charset: 'utf8'
    }
  }
}
