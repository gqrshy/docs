/**
 * CobbleRanked API Test Server
 *
 * This simple server receives data from CobbleRanked and saves it as JSON files.
 * Run with: node api-test-server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const DATA_DIR = path.join(__dirname, 'public', 'api-data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const url = new URL(req.url, `http://localhost:${PORT}`);
    console.log(`[${new Date().toISOString()}] ${req.method} ${url.pathname}`);

    // Handle POST requests (receiving data from CobbleRanked)
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                let filename;

                if (url.pathname === '/cobbleranked/usage-stats') {
                    filename = 'usage-stats.json';
                } else if (url.pathname === '/cobbleranked/leaderboard') {
                    filename = 'leaderboard.json';
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: 'Unknown endpoint' }));
                    return;
                }

                const filepath = path.join(DATA_DIR, filename);
                fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
                console.log(`  -> Saved to ${filename}`);
                console.log(`  -> Data preview:`, JSON.stringify(data).substring(0, 200) + '...');

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: `Saved ${filename}` }));
            } catch (e) {
                console.error('  -> Error:', e.message);
                res.writeHead(400);
                res.end(JSON.stringify({ error: e.message }));
            }
        });
        return;
    }

    // Handle GET requests (serving saved data)
    if (req.method === 'GET') {
        let filename;

        if (url.pathname === '/cobbleranked/usage-stats') {
            filename = 'usage-stats.json';
        } else if (url.pathname === '/cobbleranked/leaderboard') {
            filename = 'leaderboard.json';
        } else if (url.pathname === '/') {
            // Index page
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                <head><title>CobbleRanked API Test Server</title></head>
                <body style="font-family: sans-serif; padding: 2rem; background: #1a1a2e; color: #fff;">
                    <h1>CobbleRanked API Test Server</h1>
                    <p>Running on port ${PORT}</p>
                    <h2>Endpoints:</h2>
                    <ul>
                        <li><a href="/cobbleranked/usage-stats" style="color: #a78bfa;">/cobbleranked/usage-stats</a> - Usage statistics</li>
                        <li><a href="/cobbleranked/leaderboard" style="color: #a78bfa;">/cobbleranked/leaderboard</a> - Leaderboard data</li>
                    </ul>
                    <h2>Status:</h2>
                    <p>Usage Stats: ${fs.existsSync(path.join(DATA_DIR, 'usage-stats.json')) ? '✅ Received' : '❌ Not yet'}</p>
                    <p>Leaderboard: ${fs.existsSync(path.join(DATA_DIR, 'leaderboard.json')) ? '✅ Received' : '❌ Not yet'}</p>
                </body>
                </html>
            `);
            return;
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Not found' }));
            return;
        }

        const filepath = path.join(DATA_DIR, filename);
        if (fs.existsSync(filepath)) {
            const data = fs.readFileSync(filepath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'No data yet. Wait for CobbleRanked to push data.' }));
        }
        return;
    }

    res.writeHead(405);
    res.end(JSON.stringify({ error: 'Method not allowed' }));
});

server.listen(PORT, () => {
    console.log('========================================');
    console.log('  CobbleRanked API Test Server');
    console.log('========================================');
    console.log(`  Server running at: http://localhost:${PORT}`);
    console.log('');
    console.log('  Configure api.yaml with:');
    console.log(`    baseUrl: "http://localhost:${PORT}/cobbleranked"`);
    console.log('');
    console.log('  Waiting for data from CobbleRanked...');
    console.log('========================================');
});
