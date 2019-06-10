const bcrypt = require('bcrypt')

module.exports.dehashed = async function (body, passwd) {
  const decipher = await new Promise((resolve, reject) => {
    bcrypt.compare(body, passwd, (err, deciphed) => {
      if (err) reject(err)
      resolve(deciphed)
    })
  })
  return decipher
}