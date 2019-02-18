import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Form, Segment } from 'semantic-ui-react'
import userService from './services/users.js'
import {
  updateRUsername,
  updateRPassword,
  updateRPassword2,
  clearRegister
} from './reducers/registerUserReducer'
import { updateMessage } from './reducers/messageReducer'

class RegistrationForm extends React.Component {
  updateUsername = e => this.props.updateRUsername(e.target.value)

  updatePassword = e => this.props.updateRPassword(e.target.value)

  updatePassword2 = e => this.props.updateRPassword2(e.target.value)

  notify = (message, color) => {
    this.props.updateMessage({
      text: message,
      color: color
    })
  }

  register = async event => {
    event.preventDefault()
    const username = this.props.username
    const password = this.props.password
    const password2 = this.props.password2
    const users = await userService.getAll()
    if (username.length < 3) {
      this.notify('Username must be at least 3 characters long', 'red')
    } else if (password !== password2) {
      this.notify("Passwords don't match!", 'red')
    } else if (password.length < 3) {
      this.notify('Password must be at least 3 characters long!', 'red')
    } else if (
      users.filter(u => u.username === username).length > 0
    ) {
      this.notify('Username is already taken!', 'red')
    } else {
      this.createAccount()
    }
  }

  createAccount = async () => {
      try {
        await userService.create({
          username: this.props.username,
          password: this.props.password
        })
      } catch (exception) {
        console.log(exception)
      }
      this.notify(`account ${this.props.username} created!`, 'green')
      this.props.clearRegister()
      this.props.history.push('/login')
    }

  render() {
    return (
      <Form onSubmit={this.register} size='large'>
        <Segment>
          <Form.Input
            icon='user'
            iconPosition='left'
            placeholder='Username'
            value={this.props.username}
            onChange={this.updateUsername}
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            value={this.props.password}
            onChange={this.updatePassword}
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            placeholder='Repeat password'
            type='password'
            value={this.props.password2}
            onChange={this.updatePassword2}
          />
          <Button color='blue' fluid size='large' type='submit'>
            Submit
          </Button>
        </Segment>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.userToRegister.username,
    password: state.userToRegister.password,
    password2: state.userToRegister.password2
  }
}

const mapDispatchToProps = {
  clearRegister,
  updateRPassword,
  updateRPassword2,
  updateRUsername,
  updateMessage
}

const connectedRegistrationForm = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegistrationForm)
)

export default connectedRegistrationForm
