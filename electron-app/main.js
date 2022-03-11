// Electron portion of the app (Mostly boilerplate)

const { app, BrowserWindow } = require('electron')

const createWindow = () => { // Create an electron window
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
  
    win.loadURL('http://localhost:3000') // Display the electron app onto the window
  }

app.whenReady().then(() => {
    createWindow()
})