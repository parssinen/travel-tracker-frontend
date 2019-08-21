import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import loginService from '../services/login'
import travelService from '../services/markers'
import InfoWindow from './InfoWindow'
import { openWindow } from '../reducers/infoWindowReducer'
import { changeTab } from '../reducers/menuTabReducer'
import { updateForm } from '../reducers/markerFormReducer'
import { addActiveMarker } from '../reducers/activeMarkerReducer'
import { initMarkers, addMarker } from '../reducers/markerReducer'
import { showMessage, showLongMessage } from '../reducers/messageReducer'
import { login } from '../reducers/userReducer'

export class GoogleMaps extends Component {
  componentDidMount = () => {
    this.showLongMessage('Klikkaa mökin sijaintia', 'green')
  }

  onMapClick = async (t, map, coord) => {
    const { latLng } = coord
    const lat = latLng.lat()
    const lng = latLng.lng()
    const credentials = {
      inputLat: lat,
      inputLon: lng
    }

    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      travelService.setToken(user.token)
      this.props.login(user)
    } catch (exception) {
      console.log(exception)
      this.showMessage('Väärin meni :/', 'red')
    }
  }

  showMessage = (text, color) =>
    this.props.showMessage({
      text,
      color
    })

  showLongMessage = (text, color) => {
    this.props.showLongMessage({
      text,
      color
    })
  }

  onMarkerClick = async props => {
    console.log('Marker Click', props)
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
          onClick={this.onMapClick}
        />
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
  showMessage,
  showLongMessage,
  login
}

const connectedWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(wrapper)

export default connectedWrapper
