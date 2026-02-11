const fetch = require('node-fetch'); // You might not have this, so I will use http module if needed, but let's try standard fetch if node 18+

// If node-fetch is not available in environment, we use http
const http = require('http');

const data = JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    content: 'This is a test message from the debug script.'
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/messages',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log('Sending test request to http://localhost:3000/api/messages ...');

const req = http.request(options, (res) => {
    let responseBody = '';

    console.log(`Status Code: ${res.statusCode}`);

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        console.log('Response Body:', responseBody);
    });
});

req.on('error', (error) => {
    console.error('Error sending request:', error.message);
    console.log('Ensure the server is running on port 3000.');
});

req.write(data);
req.end();
