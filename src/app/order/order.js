    const BrowserWindow = require('electron').remote.BrowserWindow
    const newWindowBtn = document.getElementById('addProducts')
    const path = require('path')
    newWindowBtn.addEventListener('click', function(event) {
        const modalPath = path.join(`file://${__dirname}/index.html`)
        let win = new BrowserWindow({
            frame: false
        })
        win.on('close', function() {
            win = null
        })
        win.loadURL(modalPath)
        win.show()
    })