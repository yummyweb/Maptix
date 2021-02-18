import React, { useState } from 'react';
import { render, _on, send } from './renderer.js'
import Store from 'electron-store'

export default function App() {
  const [appName, setAppName] = useState("")
  const [shortcut, setShortcut] = useState("")

  const store = new Store()

  const submitFunc = () => {
    render('add-shortcut', {appName, shortcut})
    setAppName("")
    setShortcut("")
  }

  return (
    <>
      <label onClick={() => render('close-app', null)}>✕</label>
      <div className="shortcut-form">
        <input value={appName} onChange={e => setAppName(e.target.value)} className="app-name-input" />
        <input value={shortcut} onChange={e => setShortcut(e.target.value)} className="shortcut-input" />
        <button onClick={e => submitFunc()} className="shortcut-button">Add</button>
      </div>
      <div>
        <p>My Mappings:</p>
        <ol>
          {
            store.store ?
            Object.keys(store.store).map(function(key, index) {
              return (
                <li key={key}>{ key } - <button onClick={() => store.delete(key)} class="delete-button">Delete</button></li>
              )
            }) :
            null
          }
        </ol>
      </div>
    </>
  )
}