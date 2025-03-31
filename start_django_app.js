// This is a proxy script to run the Django app from the Node.js environment
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Django application...');

// Run the Python script
const djangoProcess = spawn('python', ['run_django.py'], {
  stdio: 'inherit', // Pass all stdio to parent process
  shell: true
});

djangoProcess.on('error', (err) => {
  console.error('Failed to start Django process:', err);
});

djangoProcess.on('close', (code) => {
  console.log(`Django process exited with code ${code}`);
});