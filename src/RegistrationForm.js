import React from 'react'
import {
  Button,
  Form,
  Grid,
  Icon,
  Header,
  Message,
  Segment
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const RegistrationForm = ({
  onSubmit,
  handleChange,
  username,
  password,
  password2
}) => {
  return (
    <div className='login-form'>
      <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='blue' textAlign='center'>
            <Icon name='user circle' /> Create new account
          </Header>
          <Form
            onSubmit={onSubmit}
            size='large' /*loading success error field error*/
          >
            <Segment>
              <Form.Input
                fluid
                icon='user'
                name='newUsername'
                iconPosition='left'
                placeholder='Username'
                value={username}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon='lock'
                name='newPassword'
                iconPosition='left'
                placeholder='Password'
                type='password'
                value={password}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon='lock'
                name='newPassword2'
                iconPosition='left'
                placeholder='Repeat password'
                type='password'
                value={password2}
                onChange={handleChange}
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
    </div>
  )
}
export default RegistrationForm
