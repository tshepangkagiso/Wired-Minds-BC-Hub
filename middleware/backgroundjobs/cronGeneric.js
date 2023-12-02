// Import necessary modules
const { response } = require('express');
const cron = require('node-cron');
const fetch = require('node-fetch');

// Define API endpoints
const apiGeneric = "https://wired-bc.onrender.com/generic"

// Function to create a cron job for the first API endpoint
const CronGeneric1 = (apiGeneric) => {
    // Schedule the task to call the API endpoint every 3 minutes
    cron.schedule('*/3 * * * *', () => {
        // Make a request to the API
        fetch(apiGeneric)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network url: ${apiGeneric} is not responding`);
                }
                return console.log(`Network url: ${apiGeneric} is responding`);
            })
            .then(data => {
                console.log('API called:', data);
            })
            .catch(error => {
                console.error('Error calling API', error);
            });
    });
}

// Function to create a cron job for the first API endpoint
const CronGeneric2 = (apiGeneric) => {
    // Schedule the task to call the API endpoint every 6 minutes
    cron.schedule('*/6 * * * *', () => {
        // Make a request to the API
        fetch(apiGeneric)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network url: ${apiGeneric} is not responding`);
                }
                return console.log(`Network url: ${apiGeneric} is responding`);
            })
            .then(data => {
                console.log('API called:', data);
            })
            .catch(error => {
                console.error('Error calling API', error);
            });
    });
}

// Function to create a cron job for the first API endpoint
const CronGeneric3 = (apiGeneric) => {
    // Schedule the task to call the API endpoint every 12 minutes
    cron.schedule('*/12 * * * *', () => {
        // Make a request to the API
        fetch(apiGeneric)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network url: ${apiGeneric} is not responding`);
                }
                return console.log(`Network url: ${apiGeneric} is responding`);
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
module.exports = { CronGeneric1, CronGeneric2, CronGeneric3,apiGeneric };
