import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'

import { useState } from 'react'

function App() {
  // Use initialEmails for state
  // console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails)
  console.log(emails)

  function toggleRead(targetEmail) {
    const updatedEmails = emails.map(function(email) {
      if (email.id === targetEmail.id) {
        email.read = !email.read
        console.log(email)
      }
      return email
    })
    setEmails(updatedEmails)
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
            <label htmlFor="hide-read">Hide read</label>
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
        <ul className="inbox-list">
          {emails.map(function (email) {
            return (
              <li key={email.id} className="email">
                <input
                  type="checkbox"
                  checked={email.read}
                  onChange={function () {
                    toggleRead(email)
                  }}
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
