const Max = require('max-api');
const { exec } = require('child_process');
const path = require('path');

Max.post("Node script loaded.");

// Function to launch the Electron app
function launchElectronApp() {
    const appPath = '/Applications/g4l/g4l-ui/release/build/Mac/gary4live.app';

    exec(`open "${appPath}"`, (error, stdout, stderr) => {
        if (error) {
            Max.post(`exec error: ${error}`);
            return;
        }
        Max.post(`stdout: ${stdout}`);
        if (stderr) {
            Max.post(`stderr: ${stderr}`);
        }
    });
}

// Ensure Node script is ready
Max.addHandler('launch', () => {
    launchElectronApp();
});

// Optional: add a ready check
Max.addHandler('ready', () => {
    Max.outlet('ready');
});

// Listen for bang from Max
Max.addHandler('bang', () => {
    launchElectronApp();
});
