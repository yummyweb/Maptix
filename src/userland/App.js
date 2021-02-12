import React, { useState } from 'react';
import { render, on, send } from './renderer.js'

export default function App() {
  const [appName, setAppName] = useState("")
  const [shortcut, setShortcut] = useState("")

  const submitFunc = () => {
    render('add-shortcut', {appName, shortcut})
    setAppName("")
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
          {on('send-shortcut-data', (_event, data) => { 
            data.appName.map(name => {
              return (
                <li>{ name }</li>
              )
            })
          })}
        </ol>
      </div>
    </>
  )
}
