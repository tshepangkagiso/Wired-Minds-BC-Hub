'use strict'
require('dotenv').config();
const express = require('express') , app = express();
//const path = require('path');
const {logger, logEvents} = require('./middleware/logger');
const eventHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser');// Importing the 'cookie-parser' middleware for parsing cookies in Express.js
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const port = process.env.PORT || 3000
const mainRouter = require('./routes/mainRouter');

//database configuration
connectDB()


//middleware
app.use('/assets', express.static('views/assets'));//Set 'assets' folder as the static folder for serving CSS, images, etc.
app.set('view engine', 'ejs');//This line tells Express to use EJS as the view engine for your application
app.use(express.urlencoded({extended:false}));// Parse URL-encoded form data
app.use(logger);
app.use( cors(corsOptions) );// Using the 'cors' middleware to handle Cross-Origin Resource Sharing (CORS) in Express.js
app.use(express.json());
app.use(cookieParser());// Using cookieParser middleware to parse incoming request cookies


app.get('/', (req, res) => {
    res.render('index')
});
//routes
app.use('/', mainRouter);

// we want this middleware to run just before app listens
app.use(eventHandler);

//server
mongoose.connection.once('open', () => {
    console.log('connected to mongodb');
    app.listen(port, ()=>{console.log(`server running on port ${port}`)})     
});

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}\t${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
})
