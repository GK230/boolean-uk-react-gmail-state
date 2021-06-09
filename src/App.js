import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'

import { useState } from 'react'

function App() {
  // Use initialEmails for state
  // console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails)
  console.log(emails)

  function toggleRead(event, email) {
    if (email.read === false) {
      setEmails([...emails, (email.read = true)])
    } else {
      setEmails([...emails, (email.read = false)])
    }
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emails.map(function (email) {
            return (
              <li className="email">
                <input
                  type="checkbox"
                  onChange={event => toggleRead(event.target.value, email)}
                />
                <input type="checkbox" className="star-checkbox" />
                <p>{email.sender}</p>
                <p className="title">{email.title}</p>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}



export default App
