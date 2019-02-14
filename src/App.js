import React, { Component } from 'react'
import GoogleApiWrapper from './GoogleApiWrapper'
import {
  BrowserRouter as Router,
  withRouter,
  Redirect,
  Route
} from 'react-router-dom'
import {
  Container,
  Divider,
  Modal,
  Header,
  Link,
  Image,
  Grid,
  Form,
  Segment,
  Menu,
  Icon,
  Button,
  Message
} from 'semantic-ui-react'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import travelService from './services/travels'
import loginService from './services/login'
import userService from './services/users.js'
import Notification from './Notification'

const inlineStyle = {
  modal: {
    marginTop: '-250px',
    display: 'fixed !important'
  }
}

export class App extends Component {
  state = {
    user: null,
    username: '',
    newUsername: '',
    newPassword: '',
    newPassword2: '',
    password: '',
    color: '',
    message: ''
  }

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount = async () => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      this.setState({ user })
      travelService.setToken(user.token)
    }
  }

  logout = () => {
    travelService.setToken(null)
    window.localStorage.removeItem('loggedInUser')
    this.notify(`${this.state.user.username} logged out succesfully!`, 'green')
    this.setState({ user: null })
    console.log('hoidettu')
  }

  notify = (message, color) => {
    this.setState({ message, color })
    setTimeout(() => {
      this.setState({
        message: null,
        color: null
      })
    }, 2000)
  }

  login = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      console.log('KÄYTTÄJÄ', user)
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
    const password = this.state.newPassword
    if (password !== this.state.newPassword2) {
      this.notify("Passwords don't match!", 'red')
    } else if (password.length < 3) {
      this.notify('Password must be at least 3 characters long!', 'red')
    } else {
      this.createAccount()
    }
  }

  createAccount = async () => {
    try {
      const user = await userService.create({
        username: this.state.newUsername,
        password: this.state.newPassword
      })
      this.notify(`account ${this.state.newUsername} created!`, 'green')
      this.setState({
        newUsername: '',
        newPassword: '',
        newPassword2: ''
      })
    } catch (exception) {
      console.log(exception)
      this.notify('server error!', 'red')
    }
    this.props.history.push('/login')
  }

  render() {
    console.log('THE USER IS', this.state.user)
    const user = this.state.user !== null
    return (
      <Container>
        <Notification message={this.state.message} color={this.state.color} />
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
              ? () => (
                  <Map
                    user={this.state.user}
                    logout={this.logout}
                    settings={this.logout}
                  />
                )
              : () => <Redirect to='/' />
          }
        />
      </Container>
    )
  }
}

const Map = ({ user, logout, settings }) => {
  return (
    <div>
      <MenuExampleButtons
        name={user.username}
        logout={logout}
        settings={settings}
      />
      <GoogleApiWrapper
        user={user}
        apiKey='AIzaSyCy6G0q6EnGtGPGAAvLlC37STQU4Med0xE'
        language={'en'}
      />
    </div>
  )
}

const MenuExampleButtons = ({ name, logout, settings }) => (
  <Menu stackable widths={4} size='huge'>
    <Menu.Item>Welcome {name}!</Menu.Item>
    <Menu.Item>
      <Button onClick={settings}>Settings</Button>
    </Menu.Item>
    <Menu.Item>
      <Button onClick={logout}>Log out</Button>
    </Menu.Item>
  </Menu>
)

export default withRouter(App)
