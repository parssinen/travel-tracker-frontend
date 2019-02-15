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
//import Notification from './Notification'
import { message } from './reducers/messageReducer'
import { messageColor } from './reducers/messageColorReducer'

export class Application extends Component {
  state = {
    user: null,
    username: '',
    newUsername: '',
    newPassword: '',
    newPassword2: '',
    password: '',
    //color: '',
    //message: '',
    settingsOpen: false,
    menu: true
  }

  handleFieldChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  componentDidMount = async () => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      this.setState({ user })
      travelService.setToken(user.token)

      //this.props.anecdoteInitialization()
    }
  }

  logout = () => {
    travelService.setToken(null)
    window.localStorage.removeItem('loggedInUser')
    this.setState({ user: null })
  }

  notify = (message, color) => {
    console.log('väri', color, 'viesti', message)
    this.props.message({
      color: color,
      message: message
    })
  }

  login = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      travelService.setToken(user.token)
      this.setState({ username: '', password: '', user: user })
      this.notify(`${this.state.user.username} logged in succesfully!`, 'green')
    } catch (exception) {
      console.log(exception)
      this.notify('invalid username or password, try again!', 'red')
      this.setState({ username: '', password: '' })
    }
  }

  register = async event => {
    event.preventDefault()
    const username = this.state.newUsername
    const password = this.state.newPassword
    if (username.length < 3) {
      this.notify('Username must be at least 3 characters long', 'red')
    } else if (password !== this.state.newPassword2) {
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
      users.filter(user => user.username === this.state.newUsername).length > 0
    ) {
      this.notify('Username is already taken!', 'red')
    } else {
      try {
        await userService.create({
          username: this.state.newUsername,
          password: this.state.newPassword
        })
      } catch (exception) {
        console.log(exception)
      }
      this.notify(`account ${this.state.newUsername} created!`, 'green')
      this.setState({
        newUsername: '',
        newPassword: '',
        newPassword2: ''
      })
      this.props.history.push('/login')
    }
  }

  settings = () => this.setState({ settingsOpen: true })

  settingsOnClose = () => this.setState({ settingsOpen: false })

  menuOff = () => this.setState({ menu: false })

  menuOn = () => this.setState({ menu: true })

  render() {
    const user = this.state.user
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
                    handleChange={this.handleFieldChange}
                    username={this.state.username}
                    password={this.state.password}
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
                    handleChange={this.handleFieldChange}
                    username={this.state.newUsername}
                    password={this.state.newPassword}
                    password2={this.state.newPassword2}
                  />
                )
          }
        />
        <Route
          path='/map'
          render={
            user
              ? () => <Map user={this.state.user} logout={this.logout} />
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
        <Button centered color='blue' onClick={logout} size='large'>
          <Icon name='log out' />
          Log out
        </Button>
      </Menu.Item>
    </Menu>
  </div>
)

const connectedApplication = withRouter(
  connect(
    null,
    {
      message
    }
  )(Application)
)

export default connectedApplication
