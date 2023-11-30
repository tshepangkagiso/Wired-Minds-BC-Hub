const {logEvents} = require('./logger');

//override default express error handling
 const errorHandler = (err,req,res,next) =>{
    // Logging the error details, request method, URL, and origin headers using the logEvents helper function
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
    
    //tell us about error and where it is
    console.log(err.stack);

    // Determining the HTTP status code to be sent in the response
    const status = res.statusCode ? res.statusCode : 500; // Default to 500 (server error) if no status code is set
    res.status(status)
    res.json({message: err.message})
}

module.exports = errorHandler;