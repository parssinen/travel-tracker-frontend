import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Segment } from 'semantic-ui-react'
import loginService from './services/login'
import travelService from './services/travels'
import { loginUser, logoutUser } from './reducers/userReducer'
import {
  updateUsername,
  updatePassword,
  clearLogin
} from './reducers/loginUserReducer'
import { updateMessage } from './reducers/messageReducer'
import { clearRegister } from './reducers/registerUserReducer'

class LoginForm extends Component {
  login = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login(this.props.userToLogin)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      travelService.setToken(user.token)
      this.props.clearLogin()
      this.props.clearRegister()
      this.props.loginUser(user)
    } catch (exception) {
      console.log(exception)
      this.props.updateMessage({
        text: 'invalid username or password, try again!',
        color: 'red'
      })
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
            icon='user'
            iconPosition='left'
            placeholder='Username'
            value={this.props.userToLogin.username}
            onChange={this.updateUsername}
          />
          <Form.Input
            icon='lock'
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
  updateMessage,
  clearRegister
}

const connectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default connectedLoginForm
