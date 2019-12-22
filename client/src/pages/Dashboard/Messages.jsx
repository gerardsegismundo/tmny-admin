import React from 'react'
import { connect } from 'react-redux'

const Messages = ({ messages }) => {
  return (
    <div className='messages'>
      <h2>Messages</h2>
      <ul>
        {messages.map(message => (
          <li>{message.body}</li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ inbox }) => ({
  messages: inbox.messages
})

export default connect(mapStateToProps)(Messages)
