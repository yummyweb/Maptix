import { ipcRenderer } from "electron"

async function render(signal, args) {
    await ipcRenderer.invoke(signal, args)
}

function on(signal, cb) {
    ipcRenderer.on(signal, (event, data) => cb(event, data))
}

function send(signal, args) {
    ipcRenderer.send(signal, args)
}

export { render, on, send }