const express = require('express');//first we get express
const methodOverride = require('method-override');//this to be able to make delete and put request 
const session = require('express-session'); //to store the cookies
require('dotenv').config() //store sensitive data
require('./mongodbs/app')
const morgan = require('morgan') // middleware to log http requests and errors, simplifies the process
const app = express()
const passport = require('passport'); //to do login stuff 
const MongoDBStore = require('connect-mongodb-session')(session); //to store the session information inside a cookie
const store = new MongoDBStore({ //store set-up
    uri: process.env.MONGODB_URI,
    collection: 'mySessions'
});

require('./middleware/users/localStrategy') //to do local login with passport "email and passowrd strategy"
const flash =  require('express-flash') //to send messages to the ejs template

//passport stuff

app.use(flash()) //to tell passport to use flash to display messages like wrong email 
app.use(session({ //to store user information 
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
}))
app.use(passport.session()); //to tell passport to store the information from the session
app.use(passport.initialize()); 

// use morgan
app.use(morgan('dev'))//to log the http request

// use public folder for static assets
app.use(express.static('public')) //telling our server where we want to get the css imgs and js for the user

app.use(methodOverride('_method')) //telling our server to use methodOverride
//using in out app
app.use(express.json()); 
app.use(express.urlencoded({limit: '50mb'})); //to be able to take large images into our server
//to take large images into the files

//middlewear claim
const requestAndMethod = require('./middleware/users/requestAndMethod'); 
const logged = require('./middleware/users/loggedUser');


app.use(requestAndMethod)// to console.log all the request and the http they're comming from 

const home = '/home'

for (let i = 0; i < home.length; i++){ //to redirect the user to the homepage
    if(i > 0){
        const slicedPizza = home.slice(0, i)
        app.get(slicedPizza, (req, res) => {
        res.redirect(home)
      })
    }
    
}

const instrumentsRouter = require('./controllers/instrumentsController'); 
const authRouter = require('./controllers/auth');
const userRouter = require('./controllers/userController')

//session cheker so we don't have to render the user object everytime they loggin lol
const appCheker = require('./middleware/authCheck'); //to c
app.use('/', appCheker)
app.use('/home', authRouter)
app.use('/users', userRouter)
app.use('/instruments',logged, instrumentsRouter) //logges is going to redirect you back home if you're not logged in 
const Port = process.env.PORT || 3000
app.listen(Port , ()=>{
    console.log('expres===============>')
})