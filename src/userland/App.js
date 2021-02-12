import React, { useState } from 'react';
import render from './renderer.js'

export default function App() {
  const [appName, setAppName] = useState("")
  const [shortcut, setShortcut] = useState("")

  const submitFunc = () => {
    render('add-shortcut', {appName, shortcut})
    setAppName("")
  }

  return (
    <>
      <div class="shortcut-form">
        <input value={appName} onChange={e => setAppName(e.target.value)} class="app-name-input" />
        <input value={shortcut} onChange={e => setShortcut(e.target.value)} class="shortcut-input" />
        <button onClick={e => submitFunc()} class="shortcut-button">Add</button>
      </div>
      <div>
        <p>My Mappings:</p>
        <ol>
          <li>Chrome</li>
          <li>Discord</li>
          <li>Safari</li>
          <li>VS Code</li>
          <li>Sublime Text</li> 
          <li>Sublime Text</li>
        </ol>
      </div>
    </>
  )
}
