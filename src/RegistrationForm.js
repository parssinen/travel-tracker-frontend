import React from 'react'
import {
  Button,
  Form,
  Grid,
  Icon,
  Header,
  Divider,
  Message,
  Segment
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Notification from './Notification'

const RegistrationForm = ({
  message,
  onSubmit,
  updateUsername,
  updatePassword,
  updatePassword2,
  username,
  password,
  password2
}) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Divider hidden />
      <Grid centered padded>
        <Grid.Row>
          <Notification />
        </Grid.Row>
      </Grid>
      <Divider hidden />
      {message.message ? (
        <div />
      ) : (
        <div>
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
          <Divider hidden />
        </div>
      )}
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='blue' textAlign='center'>
            <Icon name='user circle' /> Create new account
          </Header>
          <Form onSubmit={onSubmit} size='large'>
            <Segment>
              <Form.Input
                fluid
                icon='user'
                name='newUsername'
                iconPosition='left'
                placeholder='Username'
                value={username}
                onChange={updateUsername}
              />
              <Form.Input
                fluid
                icon='lock'
                name='newPassword'
                iconPosition='left'
                placeholder='Password'
                type='password'
                value={password}
                onChange={updatePassword}
              />
              <Form.Input
                fluid
                icon='lock'
                name='newPassword2'
                iconPosition='left'
                placeholder='Repeat password'
                type='password'
                value={password2}
                onChange={updatePassword2}
              />
              <Button color='blue' fluid size='large' type='submit'>
                Submit
              </Button>
            </Segment>
          </Form>
          <Message>
            <Link to='/login'>Login to account</Link>
          </Message>
        </Grid.Column>
      </Grid>
      <Divider hidden />
    </div>
  )
}

export default RegistrationForm
