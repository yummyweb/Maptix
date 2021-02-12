import React, { useState } from 'react';
import { render, _on, send } from './renderer.js'
import Store from 'electron-store'
import { machineIdSync } from 'node-machine-id'

export default function App() {
  const [appName, setAppName] = useState("")
  const [shortcut, setShortcut] = useState("")

  const store = new Store()

  const submitFunc = () => {
    render('add-shortcut', {appName, shortcut})
    setAppName("")
    setShortcut("")
  }

  send('get-shortcut-data', null)

  return (
    <>
      <div className="shortcut-form">
        <input value={appName} onChange={e => setAppName(e.target.value)} className="app-name-input" />
        <input value={shortcut} onChange={e => setShortcut(e.target.value)} className="shortcut-input" />
        <button onClick={e => submitFunc()} className="shortcut-button">Add</button>
      </div>
      <div>
        <p>My Mappings:</p>
        <ol>
          {/* {on('send-shortcut-data', (_event, data) => { 
            data.appName.map(name => {
              console.log(name)
              return (
                <li>name</li>
              )
            })
          })} */}
          {
            store.get("appName").map((name, index) => {
              return (
                <>
                  <li key={name}>
                    { name } - <button class="delete-button">Delete</button>
                  </li>
                </>
              )
            })
          }
        </ol>
      </div>
    </>
  )
}

// { store.get("shortcuts")[index] }