const mongoose = require("mongoose");
const db = mongoose.connection;


// Connect to Mongo
mongoose
    .connect( process.env.MONGODB_URI )
    .then(()=> console.log('mongo connected: ', process.env.MONGODB_URI))
    .catch((err) => console.log(err));

db.on('disconnected', () => console.log('mongo disconnected'));
