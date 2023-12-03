// Import necessary modules
const { response } = require('express');
const cron = require('node-cron');
const fetch = require('node-fetch');

// Define API endpoints
const apiIndex = 'https://wired-bc.onrender.com';

// Function to create a cron job for the first API endpoint
const CronIndex1 = (apiIndex) => {
    // Schedule the task to call the API endpoint every 12 minutes
    cron.schedule('*/12 * * * *', () => {
        // Make a request to the API
        fetch(apiIndex)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network url: ${apiIndex} is not responding`);
                }
                return console.log(`Network url: ${apiIndex} is responding`);
            })
            .then(data => {
                console.log('API called:', data);
            })
            .catch(error => {
                console.error('Error calling API', error);
            });
    });
}

/*
Render spins down a Free web service that goes 15 minutes without receiving inbound traffic. Render spins the service back up whenever it next receives a request to process.
Spinning up a service takes a few seconds, which causes a noticeable delay for incoming requests until the service is back up and running. For example, a browser page load will hang momentarily.
 */


// Export the cron job functions
module.exports = { CronIndex1,apiIndex };
