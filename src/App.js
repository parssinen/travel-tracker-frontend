import React, { Component } from 'react'
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import travelService from './services/travels'
import { loginUser } from './reducers/userReducer'
import AddForm from './AddForm'
import Map from './Map'

export class App extends Component {
  componentDidMount = async () => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      this.props.loginUser(user)
      travelService.setToken(user.token)
    }
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
                : () => <AddForm login={true} text={text} color={color} />
            }
          />
          <Route
            path='/register'
            render={
              user
                ? () => <Redirect to='/map' />
                : () => <AddForm login={false} text={text} color={color} />
            }
          />
          <Route
            path='/map'
            render={user ? () => <Map /> : () => <Redirect to='/login' />}
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
  loginUser
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default connectedApp
