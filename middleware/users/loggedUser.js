module.exports = (req, res, next) => {
    if (req.isAuthenticated()) { //isAuthenticated is a building function to check if we have an user logged in 
      return next() //if so call next else 
    }
    return res.redirect('/home/login') //log in
}