// Import necessary modules
const { response } = require('express');
const cron = require('node-cron');
const fetch = require('node-fetch');

// Define API endpoints
const apiIndex = 'https://wired-bc.onrender.com';

// Function to create a cron job for the first API endpoint
const CronIndex1 = (apiIndex) => {
    // Schedule the task to call the API endpoint every 2 minutes
    cron.schedule('*/2 * * * *', () => {
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

// Function to create a cron job for the second API endpoint
const CronIndex2 = (apiIndex) => {
    // Schedule the task to call the API endpoint every 8 minutes
    cron.schedule('*/8 * * * *', () => {
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

// Function to create a cron job for the third API endpoint
const CronIndex3 = (apiIndex) => {
    // Schedule the task to call the API endpoint every 9 minutes
    cron.schedule('*/9 * * * *', () => {
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

// Export the cron job functions
module.exports = { CronIndex1, CronIndex2, CronIndex3,apiIndex };
