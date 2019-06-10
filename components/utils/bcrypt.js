const bcrypt = require('bcrypt')

module.exports.hashsalt = async function (string) {
  const salt = bcrypt.genSaltSync(10)
  const hasPasswd = await new Promise((resolve, reject) => {
    bcrypt.hash(string, salt, null, (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    })
  })
  return hasPasswd
}

module.exports.dehashed = async function (body, passwd) {
  /**
  * @body takes parameter from req.body.password send by user who tries to login
  * @passwd takes the hashed password from database and compare
  */
  const decipher = await new Promise((resolve, reject) => {
    bcrypt.compare(body, passwd, (err, deciphed) => {
      if (err) reject(err)
      resolve(deciphed)
    })
  })
  return decipher
}