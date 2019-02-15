import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

class Notification extends React.Component {
  render() {
    const color = this.props.color
    const message = this.props.message
    return (
      <div>
        {message ? (
          <Message
            compact
            color={color}
            header={message}
            icon={color === 'green' ? 'thumbs up' : 'warning sign'}
            size='large'
          />
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    color: state.message.color,
    message: state.message.message
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification
