const database = require('./database.js')
const knex = require('knex')(database.db)
const bookshelf = require('bookshelf')(knex)

bookshelf.plugin('registry')

module.exports = bookshelf
