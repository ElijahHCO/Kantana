const User = require('../../models/user');

module.exports = async (req, res, next)=>{
    console.log(req.body)
    const {username, email} = req.body
    try{
        const userExists = await User.findOne({$or: [{username}, {email}]})
        if(userExists) return  res.status(400).json({msg: "User already exist"})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: err})
    }
    next()
}