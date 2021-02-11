import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('api', {
  // Invoke Methods
  sendAppName: (args) => ipcRenderer.invoke('send-app-name', args),
  
  // Receive Methods
  testReceive: (callback) => ipcRenderer.on('test-receive', (event, data) => { callback(data) })
})