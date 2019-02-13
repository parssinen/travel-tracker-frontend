import React from 'react'
import { Modal, Header, Image, Menu, Button, Icon } from 'semantic-ui-react'

const AddModal = ({ open, close, inlineStyle, marker, remove }) => {
  console.log(marker)
  return (
    <Modal
      padded
      open={open}
      onClose={close}
      style={inlineStyle.modal}
      closeIcon>
      <Modal.Header>
        <AddMenu title={marker.title} remove={remove} />
      </Modal.Header>
      <Modal.Content>{marker.text}</Modal.Content>
    </Modal>
  )
}

const AddMenu = ({ title, remove }) => {
  return (
    <Menu size='huge'>
      <Menu.Item>
        <Header>{title}</Header>
      </Menu.Item>
      <Menu.Item position='right'>
        <Button icon onClick={console.log('pencil')}>
          <Icon name='pencil' />
        </Button>
      </Menu.Item>
      <Menu.Item centered>
        <Button icon onClick={remove}>
          <Icon name='trash' />
        </Button>
      </Menu.Item>
    </Menu>
  )
}

export default AddModal
