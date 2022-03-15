const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config()
const app = express()
const passport = require('passport');
const User = require('./models/user')
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'mySessions'
});
require('./middlewear/users/localStrategy')
const flash =  require('express-flash')
const instrumentsRouter = require('./controllers/instrumentsController');
const authRouter = require('./controllers/auth');




require('./mongodbs/app')




app.use(methodOverride('_method'))
//using in out app
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//passport stuff

app.use(express.static("public"))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
}))
app.use(passport.session());
app.use(passport.initialize());



//middlewear claim
const requestAndMethod = require('./middlewear/users/requestAndMethod');
const logged = require('./middlewear/users/loggedUser');



//to verify passport is more secure than my middlewear and 




app.use(requestAndMethod)
app.use('/user', logged)






//session cheker so we don't have to render the user object everytime they loggin lol
const appCheker = require('./middlewear/authCheck')
app.use('/', appCheker)
app.use('/users', authRouter)
app.use('/instruments', instrumentsRouter)




app.listen(process.env.PORT || 3000 , ()=>{
    console.log('expres===============>')
})