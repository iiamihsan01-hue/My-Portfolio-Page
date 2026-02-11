const http = require('http');

function checkUrl(path, method = 'GET', body = null) {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: path,
        method: method,
        headers: {}
    };

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.headers['Content-Length'] = body.length;
    }

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log(`\n--- ${method} ${path} ---`);
            console.log(`Status: ${res.statusCode}`);
            console.log(`Content-Type: ${res.headers['content-type']}`);
            console.log(`Body Snippet: ${data.substring(0, 200)}...`); // First 200 chars
        });
    });

    req.on('error', (e) => console.error(`Problem with request: ${e.message}`));
    if (body) req.write(body);
    req.end();
}

checkUrl('/admin/dashboard.html');
checkUrl('/admin/index.html');
checkUrl('/admin/');
checkUrl('/api/login', 'POST', JSON.stringify({ username: 'admin', password: 'password123' }));
