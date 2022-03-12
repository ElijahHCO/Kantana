const express = require('express');
const cookieParser = require('cookie-parser');

require('dotenv').config()
const app = express()
const passport = require('passport');
const session = require('express-session')
require('./middlewear/users/localStrategy')

const flash =  require('express-flash')
const userRouter = require('./controllers/userController');
const authRouter = require('./controllers/auth');




require('./mongodbs/app')




app.use(cookieParser());
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: true}
}))
app.use(passport.initialize());
app.use(passport.session());

//using in out app
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//middlewear claim
const requestAndMethod = require('./middlewear/users/requestAndMethod');
const logged = require('./middlewear/users/loggedUser');



//to verify passport is more secure than my middlewear and 




app.use(requestAndMethod)
app.use('/', logged)








//usgin middlewear functions that are global

app.get('/', checkAuthentication, function(req,res){
    res.redirect('/login')
});
function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.send("STOPPP");
    }
}



app.use('/', authRouter)
app.use('/user', userRouter)




app.listen(process.env.PORT || 3000 , ()=>{
    console.log('expres===============>')
})