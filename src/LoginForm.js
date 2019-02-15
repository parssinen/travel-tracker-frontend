import React from 'react'
import {
  Button,
  Form,
  Grid,
  Icon,
  Header,
  Image,
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
  password,
  message,
  color
}) => {
  return (
    <div className='login-form' style={{ overflow: 'hidden' }}>
      {/*<style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>*/}
      <Notification message={message} color={color} />
      <Divider hidden />
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
          <Form
            onSubmit={onSubmit}
            size='large' /*loading success error field error*/
          >
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
