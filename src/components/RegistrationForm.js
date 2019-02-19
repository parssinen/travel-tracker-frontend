import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Form, Segment } from 'semantic-ui-react'
import userService from '../services/users.js'
import { showMessage } from '../reducers/messageReducer'
import {
  updateUsername,
  updatePassword,
  updatePassword2,
  clearForm
} from '../reducers/registerFormReducer'

class RegistrationForm extends React.Component {
  register = async event => {
    event.preventDefault()
    const username = this.props.username
    const password = this.props.password
    const password2 = this.props.password2
    if (username.length < 3) {
      this.showMessage('Username must be at least 3 characters long!', 'red')
    } else if (password !== password2) {
      this.showMessage("Passwords don't match!", 'red')
    } else if (password.length < 3) {
      this.showMessage('Password must be at least 3 characters long!', 'red')
    } else {
      this.createAccount(username, password)
    }
  }

  createAccount = async (username, password) => {
    try {
      await userService.create({
        username,
        password
      })
      this.showMessage(`Account ${username} created!`, 'green')
      this.props.clearForm()
      this.props.history.push('/login')
    } catch (exception) {
      console.log(exception)
      this.showMessage('Username is already taken!', 'red')
    }
  }

  showMessage = (text, color) =>
    this.props.showMessage({
      text,
      color
    })

  updateUsername = e => this.props.updateUsername(e.target.value)

  updatePassword = e => this.props.updatePassword(e.target.value)

  updatePassword2 = e => this.props.updatePassword2(e.target.value)

  render() {
    return (
      <Form onSubmit={this.register} size='large'>
        <Segment>
          <Form.Input
            icon='user'
            iconPosition='left'
            placeholder='Username'
            value={this.props.username}
            onChange={this.updateUsername}
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            value={this.props.password}
            onChange={this.updatePassword}
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            placeholder='Repeat password'
            type='password'
            value={this.props.password2}
            onChange={this.updatePassword2}
          />
          <Button color='blue' fluid size='large' type='submit'>
            Submit
          </Button>
        </Segment>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.registerForm.username,
    password: state.registerForm.password,
    password2: state.registerForm.password2
  }
}

const mapDispatchToProps = {
  showMessage,
  updateUsername,
  updatePassword,
  updatePassword2,
  clearForm
}

const connectedRegistrationForm = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegistrationForm)
)

export default connectedRegistrationForm
