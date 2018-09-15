const electron = require("electron");
const TimerTray = require("./app/time_tray")
const { app, BrowserWindow, Tray,ipcMain } = electron;


const path = require("path");

let mainWindow
let tray;

console.log(__dirname)

app.on('ready', () => {
  app.dock.hide();
  mainWindow = new BrowserWindow({ width: 300, height: 500, frame: false, resizable: false, show: false, webPreferences:{backgroundThrottling:false}  });
  mainWindow.loadURL(`file://${__dirname}/public/index.html`)
  mainWindow.on("blur",() => {
    mainWindow.hide();
  })

  const iconName = process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath,mainWindow);
});

ipcMain.on("update-timer",(event,timeLeft) => {
  tray.setTitle(timeLeft)
});