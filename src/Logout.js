import React, { Component } from 'react'
import { Menu, Icon, Button } from 'semantic-ui-react'
import travelService from './services/travels'
import { connect } from 'react-redux'
import { loginUser, logoutUser } from './reducers/userReducer'

class Logout extends Component {
  logout = () => {
    travelService.setToken(null)
    window.localStorage.removeItem('loggedInUser')
    this.props.logoutUser()
  }

  render() {
    return (
      <div>
        <Menu fluid widths={3} borderless size='huge'>
          <Menu.Item>
            <Button color='blue' onClick={this.logout} size='large'>
              <Icon name='log out' />
              Log out
            </Button>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userToLogin: state.userToLogin,
    userToRegister: state.userToRegister,
    message: state.message
  }
}

const mapDispatchToProps = {
  loginUser,
  logoutUser
}

const connectedLogout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout)

export default connectedLogout
