import React from 'react'
import { Message, Divider } from 'semantic-ui-react'

const Notification = ({ message, color }) => {
  const icon = color === 'red' ? 'warning sign' : 'thumbs up'
  const header = color === 'red' ? 'Warning!' : 'Success!'
  if (message) {
    return (
      <div>
        <Divider hidden />
        <Message
          icon={icon}
          size='large'
          color={color}
          header={header}
          content={message}
          warning
        />
      </div>
    )
  }
  return null
}

export default Notification
