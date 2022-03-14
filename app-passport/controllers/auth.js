const express = require('express');
const passport = require('passport')
const User = require('../models/user');
const router = express();
const userExists = require('../middlewear/users/userExists')
const {hashedPassword} = require('../middlewear/users/passwordHasser');
const backtoProfile = require('../middlewear/users/redirectToProfile');
const session = require('express-session')
const loggedUser = require('../middlewear/users/loggedUser')
router.use(passport.session());
router.use(passport.initialize());

//log in
router.post('/login',
  passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
  }))

//make new user
router.post('/new', userExists , async (req, res)=>{
    const {username, email, dob} = req.body
    console.log(req.body.password)
    const password = hashedPassword(req.body.password)
    req.body.password = password
    console.log(password)
    try{
        const newUser = await User.create(req.body)
        console.log(newUser )
        res.redirect('/login')
    }catch(err){ 
        console.log(err)
        console.log('breakig is learning')
        res.redirect('/register')
    }
})

//log in view
router.get('/login',  backtoProfile, (req, res)=> {
  res.render('login.ejs')
})


///new user viw
router.get('/register',   backtoProfile, (req, res) => {

  res.render("users/signup.ejs")
})

router.get('/home', loggedUser ,(req, res)=> {
    res.render('home.ejs')
})

router.get('/edit/:id', loggedUser,async (req, res)=>{
  try{
    console.log('ok')
      const user = await User.findById(req.session.passport.user)
      res.render('users/edit.ejs' , {
        user: user
      })
  }catch(err){
    console.log('======================================>')
    console.log(err)
      res.redirect('/home')
  }
})

router.put('/edit/:id', async (req, res)=>{
  try{
    const updated = await User.findByIdAndUpdate(req.session.passport.user, req.body)
    console.log(updated)
    res.redirect(`/home`)
  }catch(err){
    console.log(err)
    res.redirect(`/home`)
  }
})




router.post('/logout', (req, res)=>{
  res.locals.user = null;
  req.logout();
  req.session.destroy((err) => res.redirect('/login'));
  
})


router.get('/:id/profilehere', (req, res) => {
  res.send("edit profile here")
})



router.get('/id/friends', (req, res) => {
  res.send("friends here")
})










module.exports = router;