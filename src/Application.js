import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleApiWrapper from './GoogleApiWrapper'
import { withRouter, Redirect, Route } from 'react-router-dom'
import { Container, Menu, Icon, Button } from 'semantic-ui-react'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import travelService from './services/travels'
import loginService from './services/login'
import userService from './services/users.js'
import { message } from './reducers/messageReducer'
import { loginUser, logoutUser } from './reducers/userReducer'
import {
  updateUsername,
  updatePassword,
  clearLogin
} from './reducers/loginUserReducer'
import {
  updateRUsername,
  updateRPassword,
  updateRPassword2,
  clearRegister
} from './reducers/registerUserReducer'

export class Application extends Component {
  updateRUsername = event => {
    this.props.updateRUsername(event.target.value)
  }

  updateRPassword = event => {
    this.props.updateRPassword(event.target.value)
  }

  updateRPassword2 = event => {
    this.props.updateRPassword2(event.target.value)
  }

  updateUsername = event => {
    this.props.updateUsername(event.target.value)
  }

  updatePassword = event => {
    this.props.updatePassword(event.target.value)
  }

  componentDidMount = async () => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      this.props.loginUser(user)
      travelService.setToken(user.token)
    }
  }

  logout = () => {
    travelService.setToken(null)
    window.localStorage.removeItem('loggedInUser')
    this.props.logoutUser()
  }

  notify = (message, color) => {
    this.props.message({
      color: color,
      message: message
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
  
  render() {
    const user = this.props.user
    return (
      <Container>
        <Route
          exact
          path='/'
          render={
            user ? () => <Redirect to='/map' /> : () => <Redirect to='/login' />
          }
        />
        <Route
          path='/login'
          render={
            user
              ? () => <Redirect to='/map' />
              : () => (
                  <LoginForm
                    onSubmit={this.login}
                    updateUsername={this.updateUsername}
                    updatePassword={this.updatePassword}
                    username={this.props.loginUser.username}
                    password={this.props.loginUser.password}
                  />
                )
          }
        />
        <Route
          path='/create'
          render={
            user
              ? () => <Redirect to='/map' />
              : () => (
                  <RegistrationForm
                    onSubmit={this.register}
                    updateUsername={this.updateRUsername}
                    updatePassword={this.updateRPassword}
                    updatePassword2={this.updateRPassword2}
                    username={this.props.userToRegister.username}
                    password={this.props.userToRegister.password}
                    password2={this.props.userToRegister.password2}
                  />
                )
          }
        />
        <Route
          path='/map'
          render={
            user
              ? () => <Map user={this.props.user} logout={this.logout} />
              : () => <Redirect to='/' />
          }
        />
      </Container>
    )
  }
}

const Map = ({ user, logout }) => (
  <div>
    <GoogleApiWrapper
      user={user}
      apiKey='AIzaSyCy6G0q6EnGtGPGAAvLlC37STQU4Med0xE'
      language={'en'}
    />
    <Logout logout={logout} />
  </div>
)

const Logout = ({ logout }) => (
  <div>
    <Menu fluid widths={3} borderless size='huge'>
      <Menu.Item>
        <Button color='blue' onClick={logout} size='large'>
          <Icon name='log out' />
          Log out
        </Button>
      </Menu.Item>
    </Menu>
  </div>
)

const mapStateToProps = state => {
  return {
    user: state.user,
    userToLogin: state.userToLogin,
    userToRegister: state.userToRegister
  }
}

const mapDispatchToProps = {
  clearRegister,
  updateRPassword,
  updateRPassword2,
  updateRUsername,
  updateUsername,
  updatePassword,
  clearLogin,
  loginUser,
  logoutUser,
  message
}

const connectedApplication = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Application)
)

export default connectedApplication
