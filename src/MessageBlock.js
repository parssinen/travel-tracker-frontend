import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

class MessageBlock extends Component {
  constructor(props) {
    super()
    this.state = {
      name: props.name,
      visible: true
    }
  }

  handleDismiss = () => {
    this.setState({ visible: false })

    setTimeout(() => {
      this.setState({ visible: true })
    }, 2000)
  }

  render() {
    const header = `Welcome ${this.state.name}`
    if (this.state.visible) {
      return (
        <Message
          floating
          compact
          onDismiss={this.handleDismiss}
          header={header}
          content='This is a special notification which you can dismiss.'
        />
      )
    }
  }
}

export default MessageBlock
