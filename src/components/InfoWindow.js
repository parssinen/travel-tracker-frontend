import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Confirm,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Menu,
  Modal
} from 'semantic-ui-react'
import markerService from '../services/markers'
import { closeWindow } from '../reducers/infoWindowReducer'
import { changeTab } from '../reducers/menuTabReducer'
import {
  openConfirmation,
  closeConfirmation
} from '../reducers/confirmationReducer'
import {
  updateTitle,
  updateText,
  updateForm,
  clearForm
} from '../reducers/markerFormReducer'
import {
  addActiveMarker,
  removeActiveMarker
} from '../reducers/activeMarkerReducer'
import { replaceMarker, removeMarker } from '../reducers/markerReducer'

class InfoWindow extends Component {
  updateMarker = async () => {
    const marker = {
      ...this.props.activeMarker,
      title: this.props.formTitle,
      text: this.props.formText
    }
    const update = await markerService.update(marker.id, marker)
    this.props.replaceMarker(marker.id, update)
    this.props.updateForm({
      title: update.title,
      text: update.text
    })
    this.props.changeTab('info')
    this.props.addActiveMarker(update)
  }

  removeMarker = async () => {
    const id = this.props.activeMarker.id
    try {
      await markerService.remove(id)
      this.props.removeMarker(id)
      this.props.clearForm()
    } catch (exception) {
      console.log(exception)
    }
    this.props.closeConfirmation()
    this.props.removeActiveMarker()
    this.props.closeWindow()
  }

  onClose = () => {
    if (this.emptyForm()) {
      this.openConfirmation()
    } else {
      this.props.clearForm()
      this.props.removeActiveMarker()
      this.props.closeWindow()
    }
  }

  emptyForm = () =>
    this.props.activeTitle.length === 0 && this.props.activeText.length === 0

  openConfirmation = () => this.props.openConfirmation()

  closeConfirmation = () => this.props.closeConfirmation()

  onTitleChange = event => this.props.updateTitle(event.target.value)

  onTextChange = event => this.props.updateText(event.target.value)

  render() {
    return (
      <div>
        <Confirm
          header='WARNING!'
          content={this.emptyForm() ? 'Remove empty marker?' : 'Are you sure?'}
          cancelButton='Nevermind.'
          confirmButton="Let's do it!"
          open={this.props.confirmation}
          onCancel={this.closeConfirmation}
          onConfirm={this.removeMarker}
          style={{ marginTop: '-125px' }}
        />
        <Modal
          open={this.props.infoWindow}
          onClose={this.onClose}
          scrolling
          size='small'
          style={{ marginTop: '-250px' }}
          closeIcon>
          <div>
            <Menu icon='labeled' widths={3} tabular size='huge' color='blue'>
              <Menu.Item
                active={this.props.menuTab === 'info'}
                onClick={() => this.props.changeTab('info')}>
                <Icon name='book' />
                Info
              </Menu.Item>
              <Menu.Item
                active={this.props.menuTab === 'edit'}
                onClick={() => this.props.changeTab('edit')}>
                <Icon name='edit' />
                Edit
              </Menu.Item>
              <Menu.Item
                active={this.props.menuTab === 'remove'}
                onClick={() => this.props.changeTab('remove')}>
                <Icon name='trash' />
                Remove
              </Menu.Item>
            </Menu>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            {this.props.menuTab === 'info' ? (
              <div>
                <div>
                  <Grid centered verticalAlign='middle'>
                    <Grid.Row>
                      <Header as='h1' textAlign='center'>
                        <Divider hidden />
                        {this.props.formTitle.length > 0
                          ? this.props.activeTitle
                          : null}
                      </Header>
                    </Grid.Row>
                    <Grid.Row>
                      <Header as='h3'>{this.props.activeText}</Header>
                    </Grid.Row>
                  </Grid>
                </div>
              </div>
            ) : this.props.menuTab === 'edit' ? (
              <div>
                <Grid centered verticalAlign='middle'>
                  <Grid.Column style={{ maxWidth: 450 }}>
                    <Form onSubmit={this.updateMarker} size='large'>
                      <Form.Input
                        name='newTitle'
                        label='Edit title'
                        value={this.props.formTitle}
                        onChange={this.onTitleChange}
                      />
                      <Form.TextArea
                        name='newText'
                        label='Additional information'
                        value={this.props.formText}
                        rows={4}
                        onChange={this.onTextChange}
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
                    onClick={this.openConfirmation}>
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
  }
}

const mapStateToProps = state => {
  return {
    infoWindow: state.infoWindow,
    menuTab: state.menuTab,
    confirmation: state.confirmation,
    formTitle: state.markerForm.title,
    formText: state.markerForm.text,
    activeMarker: state.activeMarker,
    activeTitle: state.activeMarker.title,
    activeText: state.activeMarker.text
  }
}

const mapDispatchToProps = {
  closeWindow,
  changeTab,
  openConfirmation,
  closeConfirmation,
  updateTitle,
  updateText,
  updateForm,
  clearForm,
  addActiveMarker,
  removeActiveMarker,
  replaceMarker,
  removeMarker
}

const connectedInfoWindow = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoWindow)

export default connectedInfoWindow
