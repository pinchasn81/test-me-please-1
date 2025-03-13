const { spawn, exec } = require('child_process');
const path = require('path');
const http = require('http');

// Kill any existing process on port 3001
function killExistingServer() {
  return new Promise((resolve) => {
    exec('lsof -ti:3001 | xargs kill -9', () => resolve());
  });
}

// Start server and check it's ready
async function startServer() {
  await killExistingServer();

  const server = spawn('node', ['index.js'], {
    cwd: path.join(__dirname, 'server'),
    stdio: 'inherit'
  });

  // Function to check if server is ready
  function checkServer() {
    return new Promise((resolve) => {
      const request = http.get('http://localhost:3001/api/health', (res) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          setTimeout(() => checkServer().then(resolve), 1000);
        }
      });
      request.on('error', () => {
        setTimeout(() => checkServer().then(resolve), 1000);
      });
    });
  }

  // Wait for server to be ready
  await checkServer();
  console.log('Server is ready, running tests...');
  
  return server;
}

startServer();

// Handle cleanup
process.on('SIGTERM', () => {
  killExistingServer().then(() => process.exit(0));
}); 