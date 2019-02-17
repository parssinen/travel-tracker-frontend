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

const AddModal = ({
  open,
  close,
  inlineStyle,
  marker,
  newTitle,
  newText,
  onRemoveSubmit,
  onEditSubmit,
  handleTitleChange,
  handleTextChange,
  active,
  setInfo,
  setEdit,
  setSettings,
  confirmOpen,
  openConfirm,
  closeConfirm
}) => (
  <div>
    <Confirm
      centered={false}
      header='WARNING!'
      textalign='middle'
      content={
        marker.text.length === 0 && marker.title.length === 0
          ? 'Do you want to remove the empty marker?'
          : 'Are you sure?'
      }
      cancelButton='Never mind'
      confirmButton="Let's do it"
      open={confirmOpen}
      onCancel={closeConfirm}
      onConfirm={onRemoveSubmit}
    />
    <Modal
      open={open}
      onClose={close}
      style={inlineStyle.modal}
      closeIcon>
      <div>
        <Menu icon='labeled' fluid widths={3} tabular size='huge' color='blue'>
          <Menu.Item name='info' active={active === 'info'} onClick={setInfo}>
            <Icon name='book' />
            Info
          </Menu.Item>
          <Menu.Item name='edit' active={active === 'edit'} onClick={setEdit}>
            <Icon name='edit' />
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
                    <Divider hidden />
                    {newTitle.length > 0 ? marker.title : ''}
                  </Header>
                </Grid.Row>
                <Grid.Row>
                  <Header as='h3'>{marker.text}</Header>
                </Grid.Row>
              </Grid>
            </div>
          </div>
        ) : active === 'edit' ? (
          <div>
            <Grid centered verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Form onSubmit={onEditSubmit} size='large'>
                  <Form.Input
                    name='newTitle'
                    label='Edit title'
                    value={newTitle}
                    onChange={handleTitleChange}
                  />
                  <Form.TextArea
                    name='newText'
                    label='Additional information'
                    value={newText}
                    rows={4}
                    onChange={handleTextChange}
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
                onClick={openConfirm}>
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

export default AddModal
