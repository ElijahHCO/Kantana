const User = require('../../models/user');

module.exports = async (req, res, next)=>{ 
    const {username, email} = req.body //takes the username and the email from the form
    if(!username || !email){ //if email or username null then we'll end the function 
        if(!username)  req.flash('error', 'Username Field Empty');  //if username is null returns ...
        if(!email)  req.flash('error','Email Field Empty'); // if email is null returns.... 
        return res.redirect('/home/register') //then you go back to the form 
    } 
    try{
        const userExists = await User.findOne({$or: [{username}, {email}]}) //this function will try to find one with the email or the username
        if(userExists){ //if not ull
            req.flash('error','User Already Exist!'); //message
            return res.redirect('/home/register') //then you go back to the form 
        }
    }catch(err){
        req.flash('error', 'Something went wrong with that request'); //if error
        console.error(err)
        return res.redirect('/home/register') //then you go back to the form 
    }
    next()//if not on dbs will next
}