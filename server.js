const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config()
require('./mongodbs/app')
const morgan = require('morgan')
const app = express()
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'mySessions'
});

require('./middleware/users/localStrategy')
const flash =  require('express-flash')

//passport stuff

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
}))
app.use(passport.session());
app.use(passport.initialize());

// use morgan
app.use(morgan('dev'))

// use public folder for static assets
app.use(express.static(__dirname + '/public'));

app.use(methodOverride('_method'))
//using in out app
app.use(express.json());
app.use(express.urlencoded({limit: '50mb'}));
//to take large images into the files

//middlewear claim
const requestAndMethod = require('./middleware/users/requestAndMethod');
const logged = require('./middleware/users/loggedUser');



//to verify passport is more secure than my middlewear and 


app.use(requestAndMethod)

const home = '/home'

for (let i = 0; i < home.length; i++){
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
const appCheker = require('./middleware/authCheck');
app.use('/', appCheker)
app.use('/home', authRouter)
app.use('/users', userRouter, logged)
app.use('/instruments', instrumentsRouter)
const Port = process.env.PORT || 3000
app.listen(Port , ()=>{
    console.log('expres===============>')
})