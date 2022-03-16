module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect('/users/home')
    }
    next()
  }