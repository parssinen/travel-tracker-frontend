import React from 'react'
import { Message, Container, Icon } from 'semantic-ui-react'

const Notification = ({ message, color }) => {
  const icon = color === 'red' ? 'warning sign' : 'thumbs up'
  const header = color === 'red' ? 'Warning!' : 'Success!'
  if (message) {
    return (
      <Message
        icon={icon}
        size='big'
        color={color}
        header={header}
        content={message}
        warning
      />
    )
  }
  return null
}

export default Notification
