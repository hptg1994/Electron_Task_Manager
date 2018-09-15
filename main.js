const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
const path = require("path");

let mainWindow

console.log(__dirname)

app.on('ready', () => {
  mainWindow = new BrowserWindow({titleBarStyle:"hidden",webPreferences:{backgroundThrottling:false}  });
  mainWindow.loadURL(`file://${__dirname}/public/index.html`);
});

const googleOAuth
