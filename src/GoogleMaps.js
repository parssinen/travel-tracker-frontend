import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import markerService from './services/markers'
import InfoWindow from './InfoWindow'
import { connect } from 'react-redux'
import {
  updateTitle,
  updateText,
  updateForm,
  clearForm
} from './reducers/markerFormReducer'
import { openWindow, closeWindow } from './reducers/infoWindowReducer'
import {
  openConfirmation,
  closeConfirmation
} from './reducers/confirmationReducer'
import { changeTab } from './reducers/menuTabReducer'
import {
  addActiveMarker,
  removeActiveMarker
} from './reducers/activeMarkerReducer'
import {
  initMarkers,
  addMarker,
  replaceMarker,
  removeMarker
} from './reducers/markerReducer'

export class GoogleMaps extends Component {
  componentDidMount = async () => {
    const data = await markerService.getAll()
    const markers = data.map(marker => {
      return {
        id: marker.id,
        user: marker.user._id,
        title: marker.title,
        text: marker.text,
        position: { lat: marker.position.lat, lng: marker.position.lng }
      }
    })
    this.props.initMarkers(markers)
  }

  open = () => this.props.openConfirmation()
  close = () => this.props.closeConfirmation()

  handleTitleChange = event => this.props.updateTitle(event.target.value)

  handleTextChange = event => this.props.updateText(event.target.value)

  updateMarker = async () => {
    const editedMarker = {
      ...this.props.activeMarker,
      title: this.props.markerForm.title,
      text: this.props.markerForm.text
    }
    const updatedMarker = await markerService.update(
      editedMarker.id,
      editedMarker
    )
    this.props.replaceMarker(editedMarker.id, updatedMarker)
    this.props.updateForm({
      title: updatedMarker.title,
      text: updatedMarker.text
    })
    this.props.changeTab('info')
    this.props.addActiveMarker(updatedMarker)
  }

  removeMarker = async () => {
    const toRemove = this.props.activeMarker
    try {
      await markerService.remove(toRemove.id)
      this.props.removeMarker(toRemove.id)
    } catch (exception) {
      console.log(exception)
    }
    this.props.clearForm()
    this.props.closeConfirmation()
    this.props.removeActiveMarker()
    this.props.closeWindow()
  }

  onMarkerClick = async props => {
    const lat = props.position.lat
    const lng = props.position.lng
    const clickedMarker = this.props.markers.find(
      marker => marker.position.lat === lat && marker.position.lng === lng
    )
    this.props.updateForm({
      title: clickedMarker.title,
      text: clickedMarker.text
    })
    this.props.addActiveMarker(clickedMarker)
    this.props.openWindow()
    this.props.changeTab('info')
  }

  handleModalClose = () => {
    if (
      this.props.activeMarker.title.length === 0 &&
      this.props.activeMarker.text.length === 0
    ) {
      this.open()
    } else {
      this.props.clearForm()
      this.props.removeActiveMarker()
      this.props.closeWindow()
    }
  }

  onMapClicked = async (t, map, coord) => {
    const { latLng } = coord
    const lat = latLng.lat()
    const lng = latLng.lng()
    const newMarker = {
      user: this.props.user.id,
      title: '',
      text: '',
      position: {
        lat,
        lng
      }
    }
    try {
      const marker = await markerService.create(newMarker)
      this.props.updateForm({
        title: marker.title,
        text: marker.text
      })
      this.props.changeTab('edit')
      this.props.addActiveMarker(marker)
      this.props.openWindow()
      this.props.addMarker(marker)
    } catch (exception) {
      console.log(exception)
    }
  }

  renderMarkers = () => {
    const markers = this.props.markers
    const filtered = markers.filter(m => m.user === this.props.user.id)
    return filtered.map(marker => (
      <Marker
        key={marker.id}
        title={marker.title}
        name={marker.text}
        position={marker.position}
        onClick={this.onMarkerClick}
      />
    ))
  }

  handleClose = () => this.props.closeWindow()
  setInfo = () => this.props.changeTab('info')
  setEdit = () => this.props.changeTab('edit')
  setSettings = () => this.props.changeTab('remove')

  render() {
    console.log(this.props.menuTab)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
        <InfoWindow
          infoWindow={this.props.infoWindow}
          onClose={this.handleModalClose}
          activeMarker={this.props.activeMarker}
          form={this.props.markerForm}
          updateMarker={this.updateMarker}
          removeMarker={this.removeMarker}
          onTitleChange={this.handleTitleChange}
          onTextChange={this.handleTextChange}
          menuTab={this.props.menuTab}
          toInfo={this.setInfo}
          toEdit={this.setEdit}
          toRemove={this.setSettings}
          confirmation={this.props.confirmation}
          openConfirmation={this.open}
          closeConfirmation={this.close}
        />
        <Map
          google={this.props.google}
          zoom={2}
          initialCenter={{ lat: 0, lng: 0 }}
          onClick={this.onMapClicked}>
          {this.renderMarkers()}
        </Map>
      </div>
    )
  }
}

const wrapper = GoogleApiWrapper(({ apiKey, language }) => ({
  apiKey: apiKey,
  language: language
}))(GoogleMaps)

const mapStateToProps = state => {
  return {
    user: state.user,
    infoWindow: state.infoWindow,
    confirmation: state.confirmation,
    menuTab: state.menuTab,
    markerForm: state.markerForm,
    activeMarker: state.activeMarker,
    markers: state.markers
  }
}

const mapDispatchToProps = {
  openWindow,
  closeWindow,
  openConfirmation,
  closeConfirmation,
  updateTitle,
  updateText,
  updateForm,
  clearForm,
  changeTab,
  initMarkers,
  addMarker,
  replaceMarker,
  removeMarker,
  addActiveMarker,
  removeActiveMarker
}

const connectedWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(wrapper)

export default connectedWrapper
