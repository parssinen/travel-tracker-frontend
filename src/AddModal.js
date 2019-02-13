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

const AddModal = ({ open, close, inlineStyle, marker, remove }) => {
  console.log(marker)
  return (
    <Modal
      size='large'
      padded
      open={open}
      onClose={close}
      style={inlineStyle.modal}
      closeIcon>
      <ModalContent remove={remove} title={marker.title} text={marker.text} />
    </Modal>
  )
}

class ModalContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title,
      text: this.props.text,
      remove: this.props.remove,
      activeItem: 'info'
    }
  }

  render() {
    const activeItem = this.state.activeItem
    return (
      <div>
        <Menu icon='labeled' fluid widths={3} tabular size='huge' color='blue'>
          <Menu.Item
            name='info'
            active={activeItem === 'info'}
            onClick={() => this.setState({ activeItem: 'info' })}>
            <Icon name='trophy' />
            Hello
          </Menu.Item>
          <Menu.Item
            name='edit'
            active={activeItem === 'edit'}
            onClick={() => this.setState({ activeItem: 'edit' })}>
            <Icon name='pencil' />
            Hey
          </Menu.Item>
          <Menu.Item
            name='settings'
            active={activeItem === 'settings'}
            onClick={() => this.setState({ activeItem: 'settings' })}>
            <Icon name='trash' />
            Hi
          </Menu.Item>
        </Menu>
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Content
          active={this.state.activeItem}
          title={this.state.title}
          text={this.state.text}
          remove={this.state.remove}
        />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
      </div>
    )
  }
}

const Content = ({ active, title, text, remove }) => {
  switch (active) {
    case 'info':
      return (
        <div>
          <div>
            <Grid padded='very' centered verticalAlign='middle'>
              <Grid.Row>
                <Header as='h1' textAlign='center'>
                  {title}
                </Header>
              </Grid.Row>
              <Grid.Row>
                <Segment>{text}</Segment>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      )
    case 'edit':
      return (
        <div>
          <Grid padded='very' centered verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form
                onSubmit={() => {
                  console.log()
                }}
                size='large' /*loading success error field error*/
              >
                <Form.Input
                  name='title'
                  placeholder='Enter title'
                  label='Edit title'
                  value={null}
                  onChange={() => {
                    console.log()
                  }}
                />
                <Form.TextArea
                  autoHeight
                  name='text'
                  label='Edit information'
                  value={null}
                  placeholder='Enter travel information'
                  rows={5}
                  onChange={() => {
                    console.log()
                  }}
                />
                <Button color='blue' type='submit'>
                  Update
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      )
    default:
      return (
        <div>
          <Divider hidden />
          <Grid padded='very' centered verticalAlign='middle'>
            <Button centered color='blue' type='submit' onClick={remove}>
              Remove marker
            </Button>
          </Grid>
          <Divider hidden />
        </div>
      )
  }
}

export default AddModal
