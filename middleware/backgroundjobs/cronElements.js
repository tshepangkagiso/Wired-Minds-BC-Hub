// Import necessary modules
const { response } = require('express');
const cron = require('node-cron');
const fetch = require('node-fetch');

// Define API endpoints
const apiElements = 'https://wired-bc.onrender.com/elements'

// Function to create a cron job for the first API endpoint
const CronElements1 = (apiElements) => {
    // Schedule the task to call the API endpoint every 5 minutes
    cron.schedule('*/5 * * * *', () => {
        // Make a request to the API
        fetch(api.url1)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network url: ${apiElements} is not responding`);
                }
                return console.log(`Network url: ${apiElements} is responding`);
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
const CronElements2 = (apiElements) => {
    // Schedule the task to call the API endpoint every 10 minutes
    cron.schedule('*/10 * * * *', () => {
        // Make a request to the API
        fetch(api.url1)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network url: ${apiElements} is not responding`);
                }
                return console.log(`Network url: ${apiElements} is responding`);
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
const CronElements3 = (apiElements) => {
    // Schedule the task to call the API endpoint every 20 minutes
    cron.schedule('*/20 * * * *', () => {
        // Make a request to the API
        fetch(api.url1)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network url: ${apiElements} is not responding`);
                }
                return console.log(`Network url: ${apiElements} is responding`);
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
module.exports = {CronElements1,CronElements2,CronElements3,apiElements};
