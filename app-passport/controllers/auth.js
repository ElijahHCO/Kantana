const express = require('express');
const passport = require('passport')
const User = require('../models/user');
const Instrument = require("../models/instruments")
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
  successRedirect: '/users/home',
  failureRedirect: '/users/login',
  failureFlash: true
  }))

//make new user
router.post('/new', userExists , async (req, res)=>{
    const password = hashedPassword(req.body.password)
    req.body.password = password
    console.log(password)
    try{
        const newUser = await User.create(req.body)
        req.logIn(newUser, (err) => {
          if (err) {
              return next(err);
          }
              return res.redirect('/users/login');
      })
    }catch(err){ 
        console.log(err)
        console.log('breakig is learning')
        res.redirect('/users/register')
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

router.get('/home', loggedUser ,async (req, res)=> {
  try{
    console.log('======================================>')
    console.log('======================================>')
    const instruments = await Instrument.find({username: res.locals.userObject._id})
    console.log('======================================>')
    console.log('======================================>')
    console.log('======================================>')
    console.log('======================================>')
    console.log('======================================>')
    console.log(instruments)
    res.render('home.ejs', {
      instruments: instruments
    })
  }catch(err){
    console.log(err)
    res.redirect('/instruments/new')
  }
   
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
      res.redirect('/users/home')
  }
})

router.put('/edit/:id', async (req, res)=>{
  try{
    const updated = await User.findByIdAndUpdate(req.session.passport.user, req.body)
    console.log(updated)
    res.redirect(`/users/home`)
  }catch(err){
    console.log(err)
    res.redirect(`/users/home`)
  }
})




router.post('/logout', (req, res)=>{
  res.locals.user = null;
  req.logout();
  req.session.destroy((err) => res.redirect('/users/login'));
  
})

router.delete('/:id', async (req, res)=>{
  try{
      await User.findByIdAndDelete(req.session.passport.user)
      res.redirect('/users/register')
  }catch(err){
    res.redirect('/users/home')
  }
})











module.exports = router;