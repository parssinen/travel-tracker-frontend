import React, { Component } from 'react'
import {
  Modal,
  Header,
  Image,
  Segment,
  Form,
  Grid,
  Message,
  Divider,
  Menu,
  Button,
  Icon
} from 'semantic-ui-react'

const AddModal = ({
  open,
  close,
  inlineStyle,
  marker,
  newTitle,
  newText,
  onRemoveSubmit,
  onEditSubmit,
  handleChange,
  active,
  setInfo,
  setEdit,
  setSettings
}) => {
  console.log('oisko', newText)
  return (
    <Modal
      open={open}
      onClose={close}
      style={inlineStyle.modal}
      closeIcon>
      <div>
        <Menu icon='labeled' fluid widths={3} tabular size='huge' color='blue'>
          <Menu.Item name='info' active={active === 'info'} onClick={setInfo}>
            <Icon name='trophy' />
            Info
          </Menu.Item>
          <Menu.Item name='edit' active={active === 'edit'} onClick={setEdit}>
            <Icon name='pencil' />
            Edit
          </Menu.Item>
          <Menu.Item
            name='settings'
            active={active === 'settings'}
            onClick={setSettings}>
            <Icon name='trash' />
            Remove
          </Menu.Item>
        </Menu>
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        {active === 'info' ? (
          <div>
            <div>
              <Grid centered verticalAlign='middle'>
                <Grid.Row>
                  <Header as='h1' textAlign='center'>
                    {marker.title}
                  </Header>
                </Grid.Row>
                <Grid.Row>
                  {newText.length > 0 ? (
                    <Segment>{marker.text}</Segment>
                  ) : (
                    <div />
                  )}
                </Grid.Row>
              </Grid>
            </div>
          </div>
        ) : active === 'edit' ? (
          <div>
            <Grid centered verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Form
                  onSubmit={onEditSubmit}
                  size='large' /*loading success error field error*/
                >
                  <Form.Input
                    name='newTitle'
                    //placeholder='Enter title'
                    label='Edit title'
                    value={newTitle}
                    onChange={handleChange}
                  />
                  <Form.TextArea
                    name='newText'
                    label='Additional information'
                    value={newText}
                    //placeholder='Enter travel information'
                    rows={5}
                    onChange={handleChange}
                  />
                  <Button color='blue' fluid size='large' type='submit'>
                    Update
                  </Button>
                </Form>
              </Grid.Column>
            </Grid>
          </div>
        ) : (
          <div>
            <Divider hidden />
            <Grid padded='very' centered verticalAlign='middle'>
              <Button
                centered
                color='blue'
                type='submit'
                onClick={onRemoveSubmit}>
                Remove marker
              </Button>
            </Grid>
            <Divider hidden />
          </div>
        )}
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
      </div>
    </Modal>
  )
}

export default AddModal
