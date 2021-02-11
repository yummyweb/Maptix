import React, { useState } from 'react';
import globalShortcut from '../main'
import open from 'open'
import username from 'username'

export default function App() {
  const [appName, setAppName] = useState(null)

  return (
    <>
      <div class="shortcut-form">
        <input value={appName} onChange={e => setAppName(e.target.value)} class="shortcut-input" />
        <button class="shortcut-button">Add</button>
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
