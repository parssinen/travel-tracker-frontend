import React from 'react'
import { Message, Container, Icon } from 'semantic-ui-react'

const Notification = ({ message, color }) => {
  if (message) {
    return (
      <Message
        icon='warning sign'
        size='big'
        color={color}
        header={'Warning!'}
        content={message}
        warning
      />
    )
  }
  return null
}

export default Notification
