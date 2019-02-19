import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import travelService from './services/markers'
import { login, logout } from './reducers/userReducer'
import { clearForm } from './reducers/registerFormReducer'
import Forms from './components/Forms'
import Map from './components/Map'

export class App extends Component {
  componentDidMount = async () => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      this.props.login(user)
      travelService.setToken(user.token)
    }
  }

  logout = () => {
    travelService.setToken(null)
    window.localStorage.removeItem('loggedInUser')
    this.props.clearForm()
    this.props.logout()
  }

  render() {
    const user = this.props.user
    const text = this.props.text
    const color = this.props.color
    return (
      <Router>
        <Container>
          <Route exact path='/' render={() => <Redirect to='/login' />} />
          <Route
            path='/login'
            render={
              user
                ? () => <Redirect to='/map' />
                : () => <Forms login={true} text={text} color={color} />
            }
          />
          <Route
            path='/register'
            render={
              user
                ? () => <Redirect to='/map' />
                : () => <Forms login={false} text={text} color={color} />
            }
          />
          <Route
            path='/map'
            render={
              user
                ? () => <Map logout={this.logout} />
                : () => <Redirect to='/login' />
            }
          />
        </Container>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    text: state.message.text,
    color: state.message.color
  }
}

const mapDispatchToProps = {
  login,
  logout,
  clearForm
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default connectedApp
