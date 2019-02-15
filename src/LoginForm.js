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

const LoginForm = ({
  onSubmit,
  handleChange,
  username,
  password
}) => {
  const message = true
  return (
    <div style={{ overflow: 'hidden' }}>
      <Divider hidden />
      <Grid centered padded>
        <Grid.Row>
            <Notification />
        </Grid.Row>
      </Grid>
      <Divider hidden />

      {message ? (
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
            <Icon name='plane' /> Log in to account
          </Header>
          <Form onSubmit={onSubmit} size='large'>
            <Segment>
              <Form.Input
                fluid
                icon='user'
                name='username'
                iconPosition='left'
                placeholder='Username'
                value={username}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon='lock'
                name='password'
                iconPosition='left'
                placeholder='Password'
                type='password'
                value={password}
                onChange={handleChange}
              />
              <Button color='blue' fluid size='large' type='submit'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            <Link to='/create'>Create new account</Link>
          </Message>
        </Grid.Column>
      </Grid>
      <Divider hidden />
    </div>
  )
}
export default LoginForm
