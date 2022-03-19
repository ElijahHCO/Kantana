const Instrument = require("../models/instruments")
const express = require('express');
const router = express.Router();
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']





// INDEX: GET
// /instruments
// Gives a page displaying all the Instruments
router.get('/', async (req, res)=>{
    try{
        const instruments = await Instrument.find().populate("username", ["username"]);
        res.locals.instruments = instruments;
        res.render('instruments/index.ejs')
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
    
    const instrument = new Instrument({
        name: req.body.name,
        description: req.body.description,
        location : req.body.location,
        price: req.body.price,
        username: req.session.passport.user
    })
    console.log(instrument)
    photoSaver(instrument, req.body.photo)
    try{
        const newInstrument = await instrument.save()
        console.log(newInstrument)
        req.flash('success',`${req.body.name} successfully created`);
        res.redirect(`instruments/${newInstrument.id}`)
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
        req.flash('error','Failed to create instruments');
        res.redirect(`/instruments/${req.params.id}`)
    }
})

// UPDATE: PUT
// /instruments/:id
// UPDATE THE instrument WITH THE SPECIFIC ID
router.put('/:id', async (req, res)=>{
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
        req.flash('error','Failed to delete instrument');
        res.redirect('/instruments')
        console.log(err)
    }
})




function photoSaver(instrument, photoEncoded) {
    if (photoEncoded == null) return
    const photo = JSON.parse(photoEncoded)
    if (photo != null && imageMimeTypes.includes(photo.type)) {
      instrument.image = new Buffer.from(photo.data, 'base64')
      instrument.imageType = photo.type
    }

  }

module.exports = router;