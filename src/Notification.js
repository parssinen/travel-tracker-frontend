import React from 'react'
import { Message } from 'semantic-ui-react'

const Notification = ({ text, color }) =>
  text ? (
    <Message
      compact
      color={color}
      header={text}
      icon={color === 'green' ? 'thumbs up' : 'warning sign'}
      size='large'
    />
  ) : null

export default Notification
