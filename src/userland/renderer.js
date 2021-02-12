import { ipcRenderer } from "electron"

async function render(signal, args) {
    await ipcRenderer.invoke(signal, args)
}

export default render