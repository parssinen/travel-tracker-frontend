import React, { Component } from 'react'
import GoogleApiWrapper from './GoogleApiWrapper'
import {
  BrowserRouter as Router,
  withRouter,
  Redirect,
  Route
} from 'react-router-dom'
import { Container, Menu, Icon, Button } from 'semantic-ui-react'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import travelService from './services/travels'
import loginService from './services/login'
import userService from './services/users.js'

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
    message: '',
    settingsOpen: false,
    menu: true
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

  settings = () => {
    this.setState({ settingsOpen: true })
  }

  settingsOnClose = () => {
    this.setState({ settingsOpen: false })
  }

  menuOff = () => {
    this.setState({ menu: false })
  }

  menuOn = () => {
    this.setState({ menu: true })
  }

  changePassword = () => {}

  render() {
    console.log('THE USER IS', this.state.user)
    const user = this.state.user !== null
    return (
      <Container style={{ height: '100%' }}>
        <Route
          exact
          path='/'
          render={
            user ? () => <Redirect to='/map' /> : () => <Redirect to='/login' />
          }
        />
        <Route
          style={{ height: '100%' }}
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
                    message={this.state.message}
                    color={this.state.color}
                  />
                )
          }
        />
        <Route
          style={{ height: '100%' }}
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
                    message={this.state.message}
                    color={this.state.color}
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
                    settings={this.settings}
                    settingsOpen={this.state.settingsOpen}
                    settingsOnClose={this.settingsOnClose}
                    menu={this.state.menu}
                    menuOff={this.menuOff}
                    menuOn={this.menuOn}
                    changePassword={this.changePassword}
                  />
                )
              : () => <Redirect to='/' />
          }
        />
      </Container>
    )
  }
}

const Map = ({
  user,
  logout,
  settings,
  settingsOpen,
  settingsOnClose,
  menu,
  menuOff,
  menuOn,
  changePassword
}) => {
  return (
    <div>
      {/*
      <Modal
        open={settingsOpen}
        onClose={settingsOnClose}
        style={inlineStyle.modal}
        closeIcon>
        <div>
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />

          {menu ? (
            <div>
              <Divider hidden />
              <Grid padded='very' centered verticalAlign='middle'>
                <Button
                  size='large'
                  centered
                  color='blue'
                  type='submit'
                  onClick={menuOff}>
                  Change password
                </Button>
              </Grid>
              <Divider hidden />
            </div>
          ) : (
            <div>
              <Grid centered verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Form
                    onSubmit={changePassword}
                    size='large' /*loading success error field error
                  >
                    <Form.Input
                      name='newTitle'
                      //placeholder='Enter title'
                      label='Edit title'
                      value={1}
                      onChange={menuOff}
                    />
                    <Form.TextArea
                      name='newText'
                      label='Additional information'
                      value={1}
                      //placeholder='Enter travel information'
                      rows={5}
                      onChange={menuOff}
                    />
                    <Button color='blue' fluid size='large' type='submit'>
                      Update
                    </Button>
                  </Form>
                </Grid.Column>
              </Grid>
            </div>
          )}
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
        </div>
          </Modal>*/}

      <GoogleApiWrapper
        user={user}
        apiKey='AIzaSyCy6G0q6EnGtGPGAAvLlC37STQU4Med0xE'
        language={'en'}
      />
      <MenuExampleButtons
        name={user.username}
        logout={logout}
        settings={settings}
      />
    </div>
  )
}

const MenuExampleButtons = ({ name, logout, settings }) => (
  <div>
    <Menu fluid widths={3} borderless size='huge'>
      <Menu.Item>
        {/*<Button color='blue' onClick={settings} size='large'>
          <Icon name='settings' />
          Settings
        </Button>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
        <Button color='blue' onClick={logout} size='large'>
          <Icon name='log out' />
          Log out
        </Button>
      </Menu.Item>
    </Menu>
  </div>
)

export default withRouter(App)
