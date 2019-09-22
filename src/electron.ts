// Initialises the electron window

import { app as ElectronApp, BrowserWindow } from "electron";

let win : BrowserWindow;

function createWindow() : void {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile("index.html");
    win.setMenuBarVisibility(false);
}

ElectronApp.on("ready", createWindow);

ElectronApp.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        ElectronApp.quit();
    }
});

ElectronApp.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});