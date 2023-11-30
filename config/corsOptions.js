const allowedOrigins = require('./allowedOrigins');

// Define CORS options
const corsOptions = {
    /*The origin option, for instance, defines which origins are allowed to access your server. You can set it to a string or provide a function for more dynamic control. */
    origin: (origin, callback)=>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    }, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
    credentials: true, // Enable credentials (cookies, authorization headers) cross-origin
    optionsSuccessStatus: 200, // Set the HTTP status for successful CORS preflight requests
    // Add more options as needed
};

module.exports = corsOptions;