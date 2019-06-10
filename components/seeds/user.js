
const faker = require('faker')
const bcrypt = require('bcrypt')

const createFakeUser = (data) => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: data
  })

exports.seed = async function(knex, Promise) {
  const fakeUsers = []
  const desiredUser = 10
  for (let i = 0; i < desiredUser; i++) {
    bcrypt.hash('password', 5, function( err, bcryptedPassword) {
      //save to db
      fakeUsers.push(createFakeUser(bcryptedPassword))
   })
    
    
  }
  return knex('user').del()
  .then(function () { 
    return knex('user').insert(fakeUsers)
  })
}
