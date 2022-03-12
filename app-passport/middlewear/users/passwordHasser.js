const bcrypt = require('bcrypt');

const hashedPassword = (password) => {
  console.log('adding salt')
      const salt = bcrypt.genSaltSync();
      const passWithSalt = bcrypt.hashSync(password, salt)
      return passWithSalt
}

const comparePassword = async (typedPass, hashPass) => {
  try{
    const okPass = await bcrypt.compareSync(typedPass, hashPass)
    return okPass
  }catch(err){
    return false
  }
}
module.exports = {
    hashedPassword,
    comparePassword,
};