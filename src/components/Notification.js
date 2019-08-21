import React from 'react'
import { Message } from 'semantic-ui-react'

const Notification = ({ text, color }) =>
  text ? (
    <div>
      <Message
        compact
        color={color}
        header={text}
        icon={color === 'green' ? 'thumbs up' : 'warning sign'}
        size="large"
        style={{ position: 'fixed', zIndex: '9999999', maxWidth: '400px' }}
      />
    </div>
  ) : null

export default Notification
