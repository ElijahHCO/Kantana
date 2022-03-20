const User = require('../models/user');

module.exports = async (req, res, next) => { //if we have an user logged in with passport then we want to have it as a local variable so we're using this not to keep rendering the information inside our router
  if(req.isAuthenticated()){
    try{
      const user = await User.findById(req.session.passport.user); //finding the user by the passport id
      user.password = undefined //hiding password
      res.locals.userObject = user; //making it into a local variable
      next() //this is to send you to the next 
    }catch(err){ //if errors destroy the information
      res.locals.userObject = null;
      next()
    }
  }else{  //if logged out destroy the information
    res.locals.userObject = null;
    next()
  }
}