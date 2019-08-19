import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Icon, Header, Divider, Message } from 'semantic-ui-react'
import Notification from './Notification'
import MapLogin from './MapLogin'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'

const Forms = ({ login, text, color }) => (
  <div style={{ overflow: 'hidden' }}>
    <Divider hidden />
    <Grid centered padded>
      <Grid.Row>
        <Notification text={text} color={color} />
      </Grid.Row>
    </Grid>
    <Divider hidden />
    {text ? null : (
      <div>
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
      </div>
    )}
    <Grid textAlign="center">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue">
          Sisään
        </Header>
        <MapLogin />
      </Grid.Column>
    </Grid>
    <Divider hidden />
  </div>
)

export default Forms
