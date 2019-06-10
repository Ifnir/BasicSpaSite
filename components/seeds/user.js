const bcrypt = require('./../utils/bcrypt')

module.exports.seed = async function(knex, Promise) {
  return knex('user').del()
    .then(() => {
        return knex('user').insert(
          {username: 'test', password: `secret`, email: 'test@gmail.com'},
        )
  })

  // make a update
}