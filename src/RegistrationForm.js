import React from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateMessage } from './reducers/messageReducer'
import { withRouter } from 'react-router-dom'
import { loginUser, logoutUser } from './reducers/userReducer'
import userService from './services/users.js'
import {
  updateRUsername,
  updateRPassword,
  updateRPassword2,
  clearRegister
} from './reducers/registerUserReducer'

class RegistrationForm extends React.Component {
  notify = (message, color) => {
    this.props.updateMessage({
      text: message,
      color: color
    })
  }

  register = async event => {
    event.preventDefault()
    const username = this.props.userToRegister.username
    const password = this.props.userToRegister.password
    const password2 = this.props.userToRegister.password2
    if (username.length < 3) {
      this.notify('Username must be at least 3 characters long', 'red')
    } else if (password !== password2) {
      this.notify("Passwords don't match!", 'red')
    } else if (password.length < 3) {
      this.notify('Password must be at least 3 characters long!', 'red')
    } else {
      this.createAccount()
    }
  }

  createAccount = async () => {
    const users = await userService.getAll()
    if (
      users.filter(user => user.username === this.props.userToRegister.username)
        .length > 0
    ) {
      this.notify('Username is already taken!', 'red')
    } else {
      try {
        await userService.create({
          username: this.props.userToRegister.username,
          password: this.props.userToRegister.password
        })
      } catch (exception) {
        console.log(exception)
      }
      this.notify(
        `account ${this.props.userToRegister.username} created!`,
        'green'
      )
      this.props.clearRegister()
      this.props.history.push('/login')
    }
  }

  updateUsername = event => {
    this.props.updateRUsername(event.target.value)
  }

  updatePassword = event => {
    this.props.updateRPassword(event.target.value)
  }

  updatePassword2 = event => {
    this.props.updateRPassword2(event.target.value)
  }

  render() {
    return (
      <Form onSubmit={this.register} size='large'>
        <Segment>
          <Form.Input
            fluid
            icon='user'
            name='newUsername'
            iconPosition='left'
            placeholder='Username'
            value={this.props.userToRegister.username}
            onChange={this.updateUsername}
          />
          <Form.Input
            fluid
            icon='lock'
            name='newPassword'
            iconPosition='left'
            placeholder='Password'
            type='password'
            value={this.props.userToRegister.password}
            onChange={this.updatePassword}
          />
          <Form.Input
            fluid
            icon='lock'
            name='newPassword2'
            iconPosition='left'
            placeholder='Repeat password'
            type='password'
            value={this.props.userToRegister.password2}
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
    user: state.user,
    userToLogin: state.userToLogin,
    userToRegister: state.userToRegister,
    message: state.message
  }
}

const mapDispatchToProps = {
  clearRegister,
  updateRPassword,
  updateRPassword2,
  updateRUsername,
  loginUser,
  logoutUser,
  updateMessage
}

const connectedRegistrationForm = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegistrationForm)
)

export default connectedRegistrationForm
