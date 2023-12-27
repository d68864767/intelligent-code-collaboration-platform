```javascript
// otherJSFiles.js

// Import required modules
const axios = require('axios');

// Function to make API calls
async function makeApiCall(url, method, data) {
    try {
        const response = await axios({
            method: method,
            url: url,
            data: data
        });
        return response.data;
    } catch (error) {
        console.error(`Error in API Call: ${error}`);
        throw error;
    }
}

// Function to validate user input
function validateInput(input, schema) {
    const { error } = schema.validate(input);
    if (error) {
        throw error;
    }
}

// Function to handle errors
function handleError(error, res) {
    console.error(error);
    res.status(500).json({ message: error.message });
}

// Export the functions
module.exports = {
    makeApiCall,
    validateInput,
    handleError
};
```
