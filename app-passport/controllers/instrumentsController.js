const Instrument = require("../models/instruments")
const express = require('express');
const router = express.Router();





// INDEX: GET
// /instruments
// Gives a page displaying all the Instruments
router.get('/', async (req, res)=>{
    try{
        const instruments = await Instrument.find();
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
        console.log(instrument)
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
    try{
        req.body.username = req.session.passport.user
        const newInstrument = await Instrument.create(req.body);
        req.flash('success',`${req.body.name} successfully created`);
        res.redirect('/instruments')
    }catch(err){
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

module.exports = router;