import React from 'react'
import {
  Modal,
  Header,
  Form,
  Grid,
  Divider,
  Confirm,
  Menu,
  Button,
  Icon
} from 'semantic-ui-react'

const InfoWindow = ({
  infoWindow,
  onClose,
  activeMarker,
  form,
  updateMarker,
  removeMarker,
  onTitleChange,
  onTextChange,
  menuTab,
  toInfo,
  toEdit,
  toRemove,
  confirmation,
  openConfirmation,
  closeConfirmation
}) => (
  <div>
    <Confirm
      centered={false}
      header='WARNING!'
      textalign='middle'
      content={
        activeMarker.text.length === 0 && activeMarker.title.length === 0
          ? 'Remove empty marker?'
          : 'Are you sure?'
      }
      cancelButton='Nevermind.'
      confirmButton="Let's do it!"
      open={confirmation}
      onCancel={closeConfirmation}
      onConfirm={removeMarker}
    />
    <Modal
      open={infoWindow}
      onClose={onClose}
      style={{ marginTop: '-250px' }}
      closeIcon>
      <div>
        <Menu icon='labeled' fluid widths={3} tabular size='huge' color='blue'>
          <Menu.Item active={menuTab === 'info'} onClick={toInfo}>
            <Icon name='book' />
            Info
          </Menu.Item>
          <Menu.Item active={menuTab === 'edit'} onClick={toEdit}>
            <Icon name='edit' />
            Edit
          </Menu.Item>
          <Menu.Item
            active={menuTab === 'remove'}
            onClick={toRemove}>
            <Icon name='trash' />
            Remove
          </Menu.Item>
        </Menu>
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        {menuTab === 'info' ? (
          <div>
            <div>
              <Grid centered verticalAlign='middle'>
                <Grid.Row>
                  <Header as='h1' textAlign='center'>
                    <Divider hidden />
                    {form.title.length > 0 ? activeMarker.title : ''}
                  </Header>
                </Grid.Row>
                <Grid.Row>
                  <Header as='h3'>{activeMarker.text}</Header>
                </Grid.Row>
              </Grid>
            </div>
          </div>
        ) : menuTab === 'edit' ? (
          <div>
            <Grid centered verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Form onSubmit={updateMarker} size='large'>
                  <Form.Input
                    name='newTitle'
                    label='Edit title'
                    value={form.title}
                    onChange={onTitleChange}
                  />
                  <Form.TextArea
                    name='newText'
                    label='Additional information'
                    value={form.text}
                    rows={4}
                    onChange={onTextChange}
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
            <Grid padded centered verticalAlign='middle'>
              <Button
                size='large'
                centered='top'
                color='blue'
                type='submit'
                onClick={openConfirmation}>
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
  </div>
)

export default InfoWindow
