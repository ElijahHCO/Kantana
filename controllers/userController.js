const express = require('express');
const User = require('../models/user');
const Instrument = require("../models/instruments")
console.log("===========================")
const router = express();



//show home page
router.get('/home', async (req, res)=> { //this one is to show the home page
    try{
      const instruments = await Instrument.find({username: res.locals.userObject._id})//to find all your instruments and display them in the page
      res.render('users/home.ejs', {
        instruments: instruments
      })
    }catch(err){
      console.log(err) //to see the error
      res.redirect('/instruments/new')
    }
     
  })
  
  
  //to make edits to your profile
  router.get('/edit/:id', async (req, res)=>{ //if the user is logged in 
    try{
        const user = await User.findById(res.locals.userObject._id)//we always check it with the passport session
        res.render('users/edit.ejs' , {
          user: user
        })
    }catch(err){
      console.log(err)
        res.redirect('/users/home')//failure sends you home
    }
  })
  
  router.put('/edit/:id', async (req, res)=>{//eddit profile
    try{
      const hobbies = req.body.hobbies.split(',')
      req.body.hobbies = hobbies //split hobbies by comma
      const updated = await User.findByIdAndUpdate(req.session.passport.user, req.body)//finds the suser by passport id and updates it 
      res.redirect(`/users/home`)
    }catch(err){
      console.log(err)
      res.redirect(`/users/home`)//if not possible sends you home
    }
  })
  
  
  
  
  router.post('/logout', (req, res)=>{
    res.locals.user = null; //deletes all local information
    req.logout(); //deletes the sessiosn
    req.session.destroy((err) => res.redirect('/home/login'));
  
  })
  
  router.delete('/:id', async (req, res)=>{
    try{
        await Instrument.deleteMany({username: req.session.passport.user })
        await User.findByIdAndDelete(req.session.passport.user) //to delete user by their passport id
        req.logout();
        res.redirect('/home/register')
    }catch(err){
      console.error(err)
      console.log(err)
      req.flash('error','Unable to delte user D:');
      res.redirect('/users/home')
    }
  })
  

  module.exports = router