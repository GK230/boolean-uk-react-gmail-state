import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'

import { useState } from 'react'
import { flattenDiagnosticMessageText } from 'typescript'

function App() {
  // Use initialEmails for state
  // console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails)
  const [pleaseHideReadEmails, setPleaseHideReadEmails] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')

  function toggleRead(targetEmail) {
    const updatedEmails = emails.map(function (email) {
      if (email.id === targetEmail.id) {
        return { ...email, read: !email.read }
      }
      return email
    })
    setEmails(updatedEmails)
  }

  function toggleStarred(targetEmail) {
    const updatedEmails = emails.map(function (email) {
      if (email.id === targetEmail.id) {
        return { ...email, starred: !email.starred }
      }
    })
    setEmails(updatedEmails)
  }

  function hideReadEmails() {
    setPleaseHideReadEmails(!pleaseHideReadEmails)
  }

  function displayStarred() {
    let currentTab = 'starred'
    setCurrentTab(currentTab)
  }

  function displayInbox() {
    let currentTab = 'inbox'
    setCurrentTab(currentTab)
  }

  let emailsToRender = emails
  if (currentTab === 'starred')
    emailsToRender = emailsToRender.filter(email => email.starred)
  if (pleaseHideReadEmails)
    emailsToRender = emailsToRender.filter(email => !email.read)
  // if (search !== '')
  //   emailsToRender = emailsToRender.filter(email => {
  //     return (
  //       email.title.toLowerCase().includes(search.toLowerCase()) ||
  //       email.sender.toLowerCase().includes(search.toLowerCase())
  //     )
  //   })

  const unreadCount = emails.filter(email => !email.read).length
  const starredCount = emails.filter(email => email.starred).length

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => {
              displayInbox()
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadCount}</span>
          </li>
          <li
            className="item"
            onClick={() => {
              displayStarred()
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{starredCount}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={pleaseHideReadEmails}
              onChange={() => {
                hideReadEmails()
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emailsToRender.map(function (email) {
            return (
              <li
                key={email.id}
                className={`email ${email.read ? 'read' : 'unread'}`}
              >
                <input
                  type="checkbox"
                  checked={email.read}
                  onChange={function () {
                    toggleRead(email)
                  }}
                />
                <input
                  type="checkbox"
                  className="star-checkbox"
                  checked={email.starred}
                  onChange={function () {
                    toggleStarred(email)
                  }}
                />

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
