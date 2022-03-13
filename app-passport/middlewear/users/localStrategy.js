
   
const passport = require('passport');
const Strategy  = require('passport-local');
const User = require('../../models/user');
const { comparePassword } = require('./passwordHasser');
const session = require('express-session')


passport.serializeUser((user, done) => {
  console.log('Serializing User...')
  console.log(user.id)
  return done(null, user.id)});

passport.deserializeUser(async (id, done) => {
console.log('Deserializing User');
console.log(id);
  try {
    const user = await User.findById(id);
    if (user == null){ 
        return done( null, false, { message: 'User not found'})
        }
      console.log("++++++++++");
      return done(null, user);
  } catch (err) {
      console.log(err);
      done(err, null, { message: 'There was an error'});
    }
})

passport.use(
  new Strategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        if (!email || !password){
            console.log('HELLO')
             return done(null, false, {message: "No Matching Credentials"});
        } 
        console.log(email)
        const possibleUser = await User.findOne({ email });
        console.log(possibleUser)
        if (possibleUser == null){
            console.log('NO ONE IS HOME')
             return done(null, null, {message: "Wrong Email"});
        } 
        console.log('password')
        console.log(password)
        const foundUser = comparePassword(password,  possibleUser.password);
        if (foundUser) {
          console.log("======================================")
           return done(null,  possibleUser);
        } else {
          console.log(`No Matching Credentials`);
           return done(null, false, {message: "Wrong Password"} );
        }
      } catch (err) {
        console.log(err);
        console.log('error is here')
         done(err, false);
      }
    }
  )
);