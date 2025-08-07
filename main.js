// main.js

let app;
let BrowserWindow;
let path;

// Try to load Electron modules. If 'electron' is not installed or found,
// the 'require' call will throw an error.
try {
    const electron = require('electron');
    app = electron.app;
    BrowserWindow = electron.BrowserWindow;
    path = require('path');
} catch (error) {
    // If Electron modules cannot be loaded, log a warning to the console
    // and then exit the process. This message will appear in the terminal
    // where you try to run 'npm start'.
    console.error("Warning:");
    console.error("Electron Is Not Installed On This Device. Please Install To Continue.");
    console.error("Error details:", error.message);
    // Exit the application with an error code
    process.exit(1);
}

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1200, // Adjust initial width as needed
        height: 800, // Adjust initial height as needed
        minWidth: 900, // Minimum width for responsiveness
        minHeight: 600, // Minimum height for responsiveness
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Optional: for secure Node.js integration
            nodeIntegration: false, // Keep false for security unless absolutely necessary
            contextIsolation: true, // Keep true for security
        },
        frame: false, // Set to false to remove the default window frame (title bar, minimize/maximize/close buttons)
        transparent: true, // Set to true for a transparent window (requires frame: false)
        resizable: true, // Allow resizing
    });

    // Load your index.html file.
    mainWindow.loadFile('index.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

// Optional: For secure Node.js integration if needed later
// Create a dummy preload.js if you don't need it for now
// This file runs before the web page content loads in the renderer process
// It can be used to expose Node.js APIs to the renderer safely.
// For this simple app, it's not strictly necessary, but good practice.
// You can leave it empty or add basic context bridge setup.
// Example:
// const { contextBridge } = require('electron');
// contextBridge.exposeInMainWorld('electronAPI', {
//   // your APIs here
// });
