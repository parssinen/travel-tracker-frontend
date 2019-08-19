import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Segment } from 'semantic-ui-react'
import loginService from '../services/login'
import travelService from '../services/markers'
import { login } from '../reducers/userReducer'
import { showMessage } from '../reducers/messageReducer'
import {
  updateLatitude,
  updateLongitude,
  updateUsername,
  updatePassword,
  clearForm
} from '../reducers/loginFormReducer'

class LoginForm extends Component {
  login = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login(this.props.user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      travelService.setToken(user.token)
      this.props.clearForm()
      this.props.login(user)
    } catch (exception) {
      console.log(exception)
      this.showMessage('Invalid username or password!', 'red')
    }
  }

  showMessage = (text, color) =>
    this.props.showMessage({
      text,
      color
    })

  updateLatitude = event => this.props.updateLatitude(event.target.value)

  updateLongitude = event => this.props.updateLongitude(event.target.value)

  render() {
    return (
      <Form onSubmit={this.login} size="large">
        <Segment>
          <Form.Input
            placeholder="Lat"
            value={this.props.latitude}
            onChange={this.updateLatitude}
          />
          <Form.Input
            placeholder="Lon"
            value={this.props.longitude}
            onChange={this.updateLongitude}
          />
          <Button color="blue" fluid size="large" type="submit">
            Login
          </Button>
        </Segment>
      </Form>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.loginForm,
    username: state.loginForm.username,
    password: state.loginForm.password
  }
}

const mapDispatchToProps = {
  login,
  showMessage,
  updateUsername,
  updatePassword,
  clearForm
}

const connectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default connectedLoginForm
