const User = require('../../models/user');

module.exports = async (req, res, next)=>{
    console.log(req.body)
    const {username, email} = req.body
    if(!username || !email){
        if(!username)  req.flash('error', 'Username Field Empty');
        if(!email)  req.flash('error','Email Field Empty');
        return res.redirect('/users/register')
    } 
    try{
        const userExists = await User.findOne({$or: [{username}, {email}]})
        if(userExists){ 
            req.flash('error','User Already Exist!');
            return res.redirect('/users/register')
        }
    }catch(err){
        req.flash('error', 'Something went wrong with that request');
        return res.redirect('/users/register')
    }
    next()
}