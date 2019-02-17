import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Segment } from 'semantic-ui-react'
import { updateMessage } from './reducers/messageReducer'
import { loginUser, logoutUser } from './reducers/userReducer'
import {
  updateUsername,
  updatePassword,
  clearLogin
} from './reducers/loginUserReducer'
import travelService from './services/travels'
import loginService from './services/login'

class LoginForm extends Component {
  notify = (message, color) => {
    this.props.updateMessage({
      text: message,
      color: color
    })
  }

  login = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login(this.props.userToLogin)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      travelService.setToken(user.token)
      this.props.clearLogin()
      this.props.loginUser(user)
    } catch (exception) {
      console.log(exception)
      this.notify('invalid username or password, try again!', 'red')
      this.props.clearLogin()
    }
  }

  updateUsername = event => {
    this.props.updateUsername(event.target.value)
  }

  updatePassword = event => {
    this.props.updatePassword(event.target.value)
  }

  render() {
    return (
      <Form onSubmit={this.login} size='large'>
        <Segment>
          <Form.Input
            fluid
            icon='user'
            name='username'
            iconPosition='left'
            placeholder='Username'
            value={this.props.userToLogin.username}
            onChange={this.updateUsername}
          />
          <Form.Input
            fluid
            icon='lock'
            name='password'
            iconPosition='left'
            placeholder='Password'
            type='password'
            value={this.props.userToLogin.password}
            onChange={this.updatePassword}
          />
          <Button color='blue' fluid size='large' type='submit'>
            Login
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
    userToRegister: state.userToRegister
  }
}

const mapDispatchToProps = {
  updateUsername,
  updatePassword,
  clearLogin,
  loginUser,
  logoutUser,
  updateMessage
}

const connectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default connectedLoginForm
