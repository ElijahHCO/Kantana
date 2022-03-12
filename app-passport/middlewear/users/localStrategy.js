const passport = require('passport');
const Strategy  = require('passport-local');
const User = require('../../models/user');
const { comparePassword } = require('./passwordHasser');



passport.serializeUser((user, done) => {
  console.log('Serializing User...')
  console.log(user.id)
  return done(null, user.id)});

console.log('Not Going In');
passport.deserializeUser(async (id, done) => {
console.log('Deserializing User');
console.log(id);
  try {
    const user = await User.findById(id);
    if (!user){ 
        done( null, false, { msg: 'User not found'})
        }
      console.log(user);
      done(null, user);
  } catch (err) {
      console.log(err);
      done(err, null, { msg: 'There was an error'});
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
            console.log('---')
             done(null, false, {msg: "No Matching Credentials"});
        } 
        const possibleUser = await User.findOne({ email });
        if (!possibleUser){
            console.log('---')
             done(null, false, {msg: "No Matching Credentials"});
        } 
        const foundUser = comparePassword(password,  possibleUser.password);
        if (foundUser) {
           done(null,  possibleUser);
        } else {
          console.log(`No Matching Credentials`);
           done(null, false);
        }
      } catch (err) {
        console.log(err);
        console.log('error is here')
         done(err, false);
      }
    }
  )
);

