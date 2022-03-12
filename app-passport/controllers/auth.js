const express = require('express');
const passport = require('passport')
const User = require('../models/user');
const router = express();
const userExists = require('../middlewear/users/userExists')
const {hashedPassword} = require('../middlewear/users/passwordHasser');




router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send('Logged In');
});


router.post('/new', userExists , async (req, res)=>{
    userExists
    const {username, email, dob} = req.body
    console.log(req.body.password)
    const password = hashedPassword(req.body.password)
    console.log(password)
    try{
        const newUser = await User.create({username, password, email, dob})
        console.log(newUser )
        res.send(newUser )
    }catch(err){ 
        console.log(err)
        console.log('breakig is learning')
        res.status(500).send({message: err})
    }
})

router.get('/:id/edit', async (req, res)=>{
  try{
    console.log('ok')
      // if(req.session.user === req.params.id){
        console.log(req.session.user)
          const user = await User.findById(req.params.id)
          res.status(201).json({user})
  }catch(err){
      res.status(500).json(`cant update today my dudes`)
  }
})

router.get('/home', (req, res)=> {
  req.session.user ? res.render('/in') : res.send('please log in')
})



router.get('/in', (req, res)=> {
  res.send('You\' in dude')
})



router.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'success'});
});


router.get('/:id/profile here', (req, res) => {
  res.send("edit profile here")
})

router.get('/id/edit', (req, res) => {
  res.send("edit profile here")
})

router.get('/id/friends', (req, res) => {
  res.send("friends here")
})










module.exports = router;