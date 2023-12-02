// Import necessary modules
const { response } = require('express');
const cron = require('node-cron');
const fetch = require('node-fetch');

// Define API endpoints
const api = { url1: 'https://wired-bc.onrender.com', url2: 'https://www.wired-bc.onrender.com', url3: 'http://localhost:3500' };

// Function to create a cron job for the first API endpoint
const Cronjob1 = (api) => {
    // Schedule the task to call the API endpoint every 3 minutes
    cron.schedule('*/3 * * * *', () => {
        // Make a request to the API
        fetch(api.url1)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network url: ${api.url1} is not responding`);
                }
                return console.log(`Network url: ${api.url1} is responding`);
            })
            .then(data => {
                console.log('API called:', data);
            })
            .catch(error => {
                console.error('Error calling API', error);
            });
    });
}

// Function to create a cron job for the second API endpoint
const Cronjob2 = (api) => {
    // Schedule the task to call the API endpoint every 6 minutes
    cron.schedule('*/6 * * * *', () => {
        // Make a request to the API
        fetch(api.url2)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network url: ${api.url2} is not responding`);
                }
                return console.log(`Network url: ${api.url2} is responding`);
            })
            .then(data => {
                console.log('API called:', data);
            })
            .catch(error => {
                console.error('Error calling API', error);
            });
    });
}

// Function to create a cron job for the third API endpoint
const Cronjob3 = (api) => {
    // Schedule the task to call the API endpoint every 12 minutes
    cron.schedule('*/12 * * * *', () => {
        // Make a request to the API
        fetch(api.url3)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network url: ${api.url3} is not responding`);
                }
                return console.log(`Network url: ${api.url3} is responding`);
            })
            .then(data => {
                console.log('API called:', data);
            })
            .catch(error => {
                console.error('Error calling API', error);
            });
    });
}

// Export the cron job functions
module.exports = { Cronjob1, Cronjob2, Cronjob3,api };
<li><a href="https://wired-bc.onrender.com">Home</a></li>
<li><a href="https://wired-bc.onrender.com/generic">About us</a></li>
<li><a href="https://wired-bc.onrender.com/elements">Gallery</a></li>
<li><a href="https://wired-bc.onrender.com/login">Log In</a></li>
<li><a href="https://wired-bc.onrender.com/signup"></a>