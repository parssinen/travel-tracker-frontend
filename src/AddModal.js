import React from 'react'
import { Modal, Header, Image } from 'semantic-ui-react'

const AddModal = ({ open, close, inlineStyle, marker }) => {
  return (
    <Modal open={open} onClose={close} style={inlineStyle.modal} closeIcon>
      <Modal.Header>{marker.title}</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size='medium'
          src='https://react.semantic-ui.com/images/avatar/large/rachel.png'
        />
        <Modal.Description>
          <Header />
          <p>{marker.name}</p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default AddModal
