import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import loginService from '../services/login'
import travelService from '../services/markers'
import { login } from '../reducers/userReducer'
import { showMessage } from '../reducers/messageReducer'
import GoogleMapsLogin from './GoogleMapsLogin'
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
      const user = await loginService.login(this.props.latitude)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      travelService.setToken(user.token)
      this.props.clearForm()
      this.props.login(user)
    } catch (exception) {
      console.log(exception)
      this.showMessage('Väärin meni!', 'red')
    }
  }

  showMessage = (text, color) =>
    this.props.showMessage({
      text,
      color
    })

  updateLatitude = event => this.props.updateLatitude(event.target.value)

  updateLongitude = event => {
    console.log('event', event)
    this.props.updateLongitude(event.target.value)
  }

  contextRef = createRef()

  render() {
    return (
      <div>
        <GoogleMapsLogin
          apiKey="AIzaSyAAgMyvYX-legEY9KEMwixX_65Ld4h4Uao" //{process.env.REACT_APP_MAPS_API_KEY}
          language={'fi'}
        />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.loginForm,
    username: 'nuotio',
    password: state.loginForm.password
  }
}

const mapDispatchToProps = {
  login,
  showMessage,
  updateUsername,
  updatePassword,
  updateLatitude,
  updateLongitude,
  clearForm
}

const connectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default connectedLoginForm
