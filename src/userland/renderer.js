import { ipcRenderer } from "electron"

async function render(signal, args) {
    await ipcRenderer.invoke(signal, args)
}

function get(signal, cb) {
    ipcRenderer.on(signal, data => cb(data))
}

export { get, render }