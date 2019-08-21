import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import markerService from '../services/markers'
import InfoWindow from './InfoWindow'
import { openWindow } from '../reducers/infoWindowReducer'
import { changeTab } from '../reducers/menuTabReducer'
import { updateForm } from '../reducers/markerFormReducer'
import { addActiveMarker } from '../reducers/activeMarkerReducer'
import { initMarkers, addMarker } from '../reducers/markerReducer'
import { showMessage } from '../reducers/messageReducer'

export class GoogleMaps extends Component {
  showMessage = (text, color) =>
    this.props.showMessage({
      text,
      color
    })

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
    this.showMessage('Sisällä', 'green')
  }

  onMapClick = async (t, map, coord) => {
    const { latLng } = coord
    const lat = latLng.lat()
    const lng = latLng.lng()
    const markerData = {
      user: this.props.user.id,
      title: '',
      text: '',
      position: {
        lat,
        lng
      }
    }
    try {
      const marker = await markerService.create(markerData)
      this.props.updateForm({
        title: marker.title,
        text: marker.text
      })
      this.props.changeTab('edit')
      this.props.addMarker(marker)
      this.props.addActiveMarker(marker)
      this.props.openWindow()
    } catch (exception) {
      console.log(exception)
    }
  }

  onMarkerClick = async props => {
    const lat = props.position.lat
    const lng = props.position.lng
    const marker = this.props.markers.find(
      m => m.position.lat === lat && m.position.lng === lng
    )
    this.props.updateForm({
      title: marker.title,
      text: marker.text
    })
    this.props.changeTab('info')
    this.props.addActiveMarker(marker)
    this.props.openWindow()
  }

  renderMarkers = () => {
    const markers = this.props.markers
    const filtered = markers.filter(m => m.user === this.props.user.id)
    return filtered.map(m => (
      <Marker
        key={m.id}
        title={m.title}
        name={m.text}
        position={m.position}
        onClick={this.onMarkerClick}
      />
    ))
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
        <InfoWindow />
        <Map
          google={this.props.google}
          zoom={11}
          initialCenter={{ lat: 61.5238614, lng: 28.1689751 }}
          onClick={this.onMapClick}>
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
    markers: state.markers
  }
}

const mapDispatchToProps = {
  openWindow,
  changeTab,
  updateForm,
  addActiveMarker,
  initMarkers,
  addMarker,
  showMessage
}

const connectedWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(wrapper)

export default connectedWrapper
