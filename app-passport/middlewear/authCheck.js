const User = require('../models/user');

module.exports = async (req, res, next) => {
        try{
            const user = await User.findById(req.session.passport.user);
            user.password = undefined
            res.locals.userObject = user;
            console.log('password')
            console.log(res.locals.userObject)
            return next()
          }catch(err){
            res.locals.userObject = null;
            return next()
        }
}