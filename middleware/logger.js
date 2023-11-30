const { format } = require('date-fns');// Importing the 'format' function from the 'date-fns' library to format dates
const { v4: uuid } = require('uuid');// Importing the 'uuid' function from the 'uuid' library to generate unique identifiers
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const fsPromises = {
  ...fs.promises,
  mkdir: promisify(fs.mkdir),
  appendFile: promisify(fs.appendFile),
};

// Helper function for logging events with a timestamp, unique identifier, message, and saving it to a file
const logEvents = async (message, logFileName) => {
  // Generating a timestamp in the format 'yyyyMMdd\tHH:mm:ss'
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;

  // Creating a log entry with timestamp, unique identifier, message, and a newline character
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    // Checking if the 'logs' directory exists, creating it if it doesn't
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }

    // Appending the log entry to the specified log file
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
  } catch (error) {
    // Handling and logging errors if any occur during the file system operations
    console.log(error);
  }
};

// Custom middleware function for logging incoming HTTP requests
const logger = (req, res, next) => {
  // Logging successful logins
  if (req.method === 'POST' && req.url === '/login' && res.statusCode === 200) {
    const username = req.body.fullName; // Assuming you have a fullName field in your login request
    logEvents(`Login success\t${username}\t${req.headers.origin}`, 'loginLog.log');
  }

  // Logging logouts
  if (req.method === 'POST' && req.url === '/logout' && res.statusCode === 200) {
    const username = req.body.fullName; // Assuming you have stored the fullName in the request body during login
    logEvents(`Logout\t${username}\t${req.headers.origin}`, 'logoutLog.log');
  }

  // Logging the request method, URL, and origin headers using the logEvents helper function
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');

  console.log(`${req.method}  ${req.path}`);

  // Passing control to the next middleware or route handler in the chain
  next();
};

module.exports = { logEvents, logger };