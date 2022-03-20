const Instrument = require("../models/instruments")
const express = require('express');
const router = express.Router();
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif'] //for filepond uploading images which type we are going to take from the server





// INDEX: GET
// /instruments
// Gives a page displaying all the Instruments
router.get('/', async (req, res)=>{
    try{
        const instruments = await Instrument.find().populate("username", ["username"]); // .populate is to add the username to the instruments 
        res.render('instruments/index.ejs', {
            instruments: instruments //sending all the instruments to display them on the page
        })
    }catch(err){
        req.flash('error','Our system is overloaded please try again,  if the issue persists logout and log back in.');
        res.redirect('/users/home')
    }
})
// NEW: GET

// /instruments/new
// Shows a form to create a new instrument
router.get('/new', (req, res)=>{
    res.render('instruments/new.ejs')
})

// SHOW: GET
// /instruments/:id
// Shows a page displaying one instrument
router.get('/:id', async (req, res)=>{
    try{
        const instrument = await Instrument.findById(req.params.id).populate("username", ["username"])
        res.render("instruments/show.ejs", {
            instrument: instrument
        })
    }catch(err){
        req.flash('error','Our system is overloaded please try again, if the issue persists logout and log back in.');
        res.redirect('/instruments')
    }

})

// CREATE: POST
// /instruments
// Creates an actual instrument, then...?
router.post('/', async (req, res)=>{
    const instrument = new Instrument({  //we have to first make the instrument because we want to save the file into filpond cloud and then get the image path.
        name: req.body.name,
        description: req.body.description,
        location : req.body.location,
        price: req.body.price,
        username: req.session.passport.user
    })
    photoSaver(instrument, req.body.photo) //sending the file from the form to the filepond function to store it and get the image path
    try{
        const newInstrument = await instrument.save()
        req.flash('success',`${req.body.name} successfully created`);
        res.redirect(`/instruments/${newInstrument.id}`)
    }catch(err){
        console.log(err)
        req.flash('error','Failed to create instruments');
        res.redirect('/instruments/new')
    }

})

// EDIT: GET
// /instruments/:id/edit
// SHOW THE FORM TO EDIT A instrument
router.get('/:id/edit', async (req, res)=>{
    try{
        const instrument = await Instrument.findById(req.params.id)
        res.render('instruments/edit.ejs', {
            instrument: instrument
        })
    }catch(err){
        req.flash('error','Failed to go to that page');
        res.redirect(`/instruments/${req.params.id}`)
    }
})

// UPDATE: PUT
// /instruments/:id
// UPDATE THE instrument WITH THE SPECIFIC ID
router.put('/:id', async (req, res)=>{
    photoSaver(req.body, req.body.photo)
   try{
        await Instrument.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/instruments/${req.params.id}`)
   }catch(err){
        req.flash('error','Failed to update instrument');
        res.redirect(`/${req.params.id}`)
        console.log(err)
   }
})
// DELETE: DELETE
// /instruments/:id
// DELETE THE instrument WITH THE SPECIFIC ID
router.delete('/:id', async (req, res)=>{
    try{
        await Instrument.findByIdAndDelete(req.params.id)
        res.redirect('/instruments')
    }catch(err){
        console.log(err)
        req.flash('error','Failed to delete instrument');
        res.redirect(`/instruments/${req.params.id}`)
    }
})




function photoSaver(instrument, photoEncoded) {
    if (photoEncoded == null) return  //if the file is empty return
    const photo = JSON.parse(photoEncoded) //then we're going to parse the information from the json
    if (photo != null && imageMimeTypes.includes(photo.type)) {   //if the photo is not null and if the image type is not one we take, like video
      instrument.image = new Buffer.from(photo.data, 'base64') //is taking the encoded file and is storing the path for us to use it to display the image
      instrument.imageType = photo.type //instrument.imageType is going to be the file tipe we have from the form and is going to send this to the new Instrument we're making
    }

  }

module.exports = router; 