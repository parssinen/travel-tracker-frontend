import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import travelService from './services/travels'
import AddModal from './AddModal'
import { connect } from 'react-redux'
import {
  updateMarkerInfo,
  clearMarkerInfo,
  updateText,
  updateTitle
} from './reducers/markerInfoReducer'
import { openModal, closeModal } from './reducers/modalReducer'
import { changeTab } from './reducers/menuReducer'
import { openConfirm, closeConfirm } from './reducers/confirmReducer'
import {
  addActiveMarker,
  clearActiveMarker
} from './reducers/activeMarkerReducer'
import { initMarkers, addMarker } from './reducers/markersReducer'

export class GoogleMaps extends Component {
  componentDidMount = async () => {
    const data = await travelService.getAll()
    const markers = data.map(marker => {
      return {
        user: marker.user._id,
        id: marker.id,
        title: marker.title,
        text: marker.text,
        position: { lat: marker.position.lat, lng: marker.position.lng }
      }
    })
    this.props.initMarkers(markers)
  }

  open = () => this.props.openConfirm()
  close = () => this.props.closeConfirm()

  handleTitleChange = event => this.props.updateTitle(event.target.value)

  handleTextChange = event => this.props.updateText(event.target.value)

  updateMarker = async () => {
    const editedMarker = {
      ...this.props.activeMarker,
      title: this.props.markerInfo.title,
      text: this.props.markerInfo.text
    }
    const updatedMarker = await travelService.update(
      editedMarker.id,
      editedMarker
    )
    const markers = this.props.markers.filter(m => m.id !== editedMarker.id)
    this.props.initMarkers(markers)
    this.props.updateMarkerInfo({
      title: updatedMarker.title,
      text: updatedMarker.text
    })
    this.props.changeTab('info')
    this.props.addActiveMarker(updatedMarker)
    this.props.initMarkers(this.props.markers.concat(updatedMarker))
  }

  removeMarker = async () => {
    const toRemove = this.props.activeMarker
    try {
      await travelService.remove(toRemove.id)
      const markers = this.props.markers.filter(m => m.id !== toRemove.id)
      this.props.initMarkers(markers)
    } catch (exception) {
      console.log(exception)
    }
    this.props.clearMarkerInfo()
    this.props.closeConfirm()
    this.props.clearActiveMarker()
    this.props.closeModal()
  }

  onMarkerClick = async props => {
    const lat = props.position.lat
    const lng = props.position.lng
    const clickedMarker = this.props.markers.find(
      marker => marker.position.lat === lat && marker.position.lng === lng
    )
    this.props.updateMarkerInfo({
      title: clickedMarker.title,
      text: clickedMarker.text
    })
    this.props.addActiveMarker(clickedMarker)
    this.props.openModal()
    this.props.changeTab('info')
  }

  handleModalClose = () => {
    if (
      this.props.activeMarker.title.length === 0 &&
      this.props.activeMarker.text.length === 0
    ) {
      this.open()
    } else {
      this.props.clearMarkerInfo()
      this.props.clearActiveMarker()
      this.props.closeModal()
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
      const travel = await travelService.create(newMarker)
      this.props.updateMarkerInfo({
        title: travel.title,
        text: travel.text
      })
      this.props.changeTab('edit')
      this.props.addActiveMarker(travel)
      this.props.openModal()
      this.props.initMarker(this.props.markers.concat(travel))
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

  handleClose = () => this.props.closeModal()
  setInfo = () => this.props.changeTab('info')
  setEdit = () => this.props.changeTab('edit')
  setSettings = () => this.props.changeTab('settings')

  render() {
    console.log(this.props.menu)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
        <AddModal
          open={this.props.modal}
          close={this.handleModalClose}
          marker={this.props.activeMarker}
          newTitle={this.props.markerInfo.title}
          newText={this.props.markerInfo.text}
          onRemoveSubmit={this.removeMarker}
          onEditSubmit={this.updateMarker}
          handleTitleChange={this.handleTitleChange}
          handleTextChange={this.handleTextChange}
          active={this.props.menu}
          setInfo={this.setInfo}
          setEdit={this.setEdit}
          setSettings={this.setSettings}
          confirmOpen={this.props.confirm}
          openConfirm={this.open}
          closeConfirm={this.close}
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
    markerInfo: state.markerInfo,
    modal: state.modal,
    confirm: state.confirm,
    menu: state.menu,
    activeMarker: state.activeMarker,
    markers: state.markers
  }
}

const mapDispatchToProps = {
  updateText,
  updateTitle,
  clearMarkerInfo,
  updateMarkerInfo,
  openModal,
  closeModal,
  openConfirm,
  closeConfirm,
  changeTab,
  addActiveMarker,
  clearActiveMarker,
  initMarkers,
  addMarker
}

const connectedWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(wrapper)

export default connectedWrapper
