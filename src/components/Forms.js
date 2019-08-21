import React from 'react'
import Notification from './Notification'
import MapLogin from './MapLogin'

const Forms = ({ login, text, color }) => (
  <div style={{ overflow: 'hidden' }}>
    {/* <Grid centered padded>
      <Grid.Row>
        <Notification text={text} color={color} />
      </Grid.Row>
    </Grid>

    {text ? null : (
      <div>

      </div>
    )}
    <Grid textAlign="center">
      <Header as="h2" color="blue">
        Sisään
      </Header>
    </Grid> */}
    <div>
      <Notification
        text={text}
        color={color}
        style={{ position: 'relative' }}
      />
      <MapLogin style={{ position: 'fixed' }} />
    </div>
  </div>
)

export default Forms
