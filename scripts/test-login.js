const http = require('http');

const data = JSON.stringify({
    username: 'admin',
    password: 'password123'
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log('Attempting to log in with default credentials (admin/password123)...');

const req = http.request(options, (res) => {
    let responseBody = '';

    console.log(`Status Code: ${res.statusCode}`);

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        console.log('Response Body:', responseBody);
        try {
            const json = JSON.parse(responseBody);
            if (res.statusCode === 200) {
                console.log('✅ Login Successful! Token received.');
            } else {
                console.log('❌ Login Failed:', json.error);
            }
        } catch (e) {
            console.log('Response is not JSON.');
        }
    });
});

req.on('error', (error) => {
    console.error('Error sending request:', error.message);
    console.log('Make sure the server is running!');
});

req.write(data);
req.end();
