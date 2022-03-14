const User = require('../../models/user');

module.exports = async (req, res, next)=>{
    console.log(req.body)
    const {username, email} = req.body
    try{
        const userExists = await User.findOne({$or: [{username}, {email}]})
        if(userExists){ 
            req.flash('message','Registration successfully');
            res.locals.message = req.flash();
            console.log(res.locals.message.message[0])
            return res.redirect('/register')
        }
    }catch(err){
        res.locals.message = req.flash('error', 'Something went wrong with that request');
        return res.redirect('/register')
    }
    next()
}