import React from 'react'
import { Message } from 'semantic-ui-react'

const Notification = ({ message, color }) =>
  message ? (
    <div>
      <Message
        compact
        color={color}
        header={message}
        icon={color === 'green' ? 'thumbs up' : 'warning sign'}
        size='large'
      />
    </div>
  ) : null

export default Notification
