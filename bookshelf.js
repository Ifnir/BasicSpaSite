const environment = process.env.NODE_ENV || 'development'
const database = require('./knexfilejs')[environment]
const knex = require('knex')(database)
const bookshelf = require('bookshelf')(knex)

bookshelf.plugin('registry')

module.exports = bookshelf

/**
 * to create migration table
 * knex migrate:make migration_name
 * 
 * to migrate
 * knex migrate:up
 * 
 * to migrate lastest to tables
 * knex migrate:latest
 * 
 * to make seed
 * knex seed:make seed_name
 * 
 * to run seed
 * knex seed:run
 */