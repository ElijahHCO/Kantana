
   
const passport = require('passport');
const Strategy  = require('passport-local'); //strategy is the way you log in it can be local which means your using credentials or can be something like google
const User = require('../../models/user'); // needs the user schema
const { comparePassword } = require('./passwordHasser'); //needs to compare the passwords so we're getting the middlewear
const session = require('express-session') 


passport.serializeUser((user, done) => {            //serializing the user is to save the id to the passport
  console.log('Serializing User...')
  console.log(user.id)
  return done(null, user.id)});

passport.deserializeUser(async (id, done) => {   //takes id, and done 
console.log('Deserializing User');
console.log(id);
  try {
     const user = await User.findById(id);
      if (!user){ 
        return done( null, false, { message: 'User not found'})//to find user in our system done (null cause there's no error with out app and false cause we have no user, the message is to display the message)
      }
      console.log("++++++++++");
      return done(null, user); //done will return null cause no errors and user cause is true
  } catch (err) {
      console.log(err);
      done(err, false, { message: 'There was an error'}); //done will return (err cause we had an error, false and a message to display the error)
    }
})

passport.use( //using the page
  new Strategy(
    {
      usernameField: 'email', //the field we want to use as the strategy
    },
    async (email, password, done) => { //is a async function that takes email, password and done.
      try {
        if (!email || !password){ //if email is null or if password is null we'll return null cause no error, false cause we didnt verify the user and the flash message
             return done(null, false, {message: "No Matching Credentials"});
        } 
        console.log(email)
        const possibleUser = await User.findOne({ email }); //we'll try and find an user with matching credentials
        if (possibleUser == null){ //if we dont find one, then
            console.log('NO ONE IS HOME')
             return done(null, false, {message: "Wrong Email"}); //null no errors, false no validation, and the message
        } 
        console.log('password')
        console.log(password)
        const foundUser = comparePassword(password,  possibleUser.password); //if we find one we'll and take it to bycrypt to compare passwords and this will return true or false
        if (foundUser) { 
           return done(null,  possibleUser); // if found one null, no errors, possible user.
        } else {
           return done(null, false, {message: "Wrong Password"} ); //don't match then is null, false cause no matching credentials and the message
        }
      } catch (err) {
        console.log(err);
         done(err, false); //done and false cause we have an error in our system 
      }
    }
  )
);