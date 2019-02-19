import React from 'react'
import { Menu, Icon, Button } from 'semantic-ui-react'

const Logout = ({ logout }) => {
  return (
    <div>
      <Menu widths={3} borderless size='huge'>
        <Menu.Item>
          <Button color='blue' onClick={logout} size='large'>
            <Icon name='log out' />
            Log out
          </Button>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Logout
