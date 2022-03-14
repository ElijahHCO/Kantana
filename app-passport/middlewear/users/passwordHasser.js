const bcrypt = require('bcrypt');

const hashedPassword = (password) => {
  console.log('adding salt')
  const salt = bcrypt.genSaltSync();
  const passWithSalt = bcrypt.hashSync(password, salt)
  return passWithSalt
}

const comparePassword = (typedPass, hashPass) => {
  try{
    const okPass = bcrypt.compareSync(typedPass, hashPass)
    console.log(okPass)
    return okPass
  }catch(err){
    return false
  }
}
module.exports = {
    hashedPassword,
    comparePassword,
};