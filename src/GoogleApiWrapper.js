import React, { Component } from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
import {
  Item,
  Grid,
  Link,
  Icon,
  Image,
  Header,
  Modal,
  Button,
  Container
} from 'semantic-ui-react'
import travelService from './services/travels'
import AddModal from './AddModal'

const mapStyles = {
  width: '75%',
  height: '75%'
}

const inlineStyle = {
  modal: {
    marginTop: '-200px',
    display: 'fixed !important'
  }
}

export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
      modalOpen: false,
      newMarker: {},
      markers: []
    }
  }

  componentDidMount = async () => {
    const data = await travelService.getAll()
    console.log('data', data)
    const markers = data.map(marker => {
      return {
        user: marker.user._id,
        id: marker.id,
        title: marker.title,
        text: marker.text,
        position: { lat: marker.position.lat, lng: marker.position.lng }
      }
    })
    this.setState({ markers })
  }

  updateMarker = async () => {}

  removeMarker = async () => {
    const toRemove = this.state.activeMarker
    if (window.confirm(`Remove ${toRemove.title}?`)) {
      try {
        const travel = await travelService.remove(toRemove.id)
        const markers = this.state.markers.filter(m => m.id !== toRemove.id)
        await this.setState({ markers })
      } catch (exception) {
        console.log(exception)
      }
      await this.setState({
        activeMarker: {},
        modalOpen: false
      })
    }
  }

  onMarkerClick = async (props, marker, e) => {
    const lat = props.position.lat
    const lng = props.position.lng
    const clickedMarker = this.state.markers.find(
      marker => marker.position.lat === lat && marker.position.lng === lng
    )
    console.log('clicked', clickedMarker)
    await this.setState({
      selectedPlace: props,
      activeMarker: clickedMarker,
      modalOpen: true
    })
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: {},
        modalOpen: false
      })
    }
  }

  createMarker = async () => {
    const newMarker = this.state.newMarker
    console.log('täs ny', newMarker)
    try {
      const travel = await travelService.create(newMarker)
      await this.setState({
        markers: this.state.markers.concat(travel),
        activeMarker: travel,
        modalOpen: true
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  onMapClicked = (t, map, coord) => {
    const { latLng } = coord
    const lat = latLng.lat()
    const lng = latLng.lng()
    console.log('id', this.state.user)
    const newMarker = {
      user: this.state.user.id,
      title: 'moi',
      text: 'add text...',
      position: {
        lat,
        lng
      }
    }
    this.setState({ newMarker })
    console.log('täs', newMarker)
    this.createMarker()
  }

  renderMarkers = () => {
    const markers = this.state.markers.filter(
      m => m.user === this.state.user.id
    )
    console.log('markers', markers)
    return markers.map(marker => (
      <Marker
        key={marker.id}
        title={marker.title}
        name={marker.text}
        position={marker.position}
        onClick={this.onMarkerClick}
      />
    ))
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    console.log('markerit', this.state.markers)
    console.log('aktiivimarkkeri', this.state.activeMarker)
    return (
      <div
        style={{
          height: 350,
          width: '100%',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          padding: 0
        }}>
        <AddModal
          open={this.state.modalOpen}
          close={this.handleClose}
          inlineStyle={inlineStyle}
          marker={this.state.activeMarker}
          remove={this.removeMarker}
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

export default GoogleApiWrapper(({ apiKey, language }) => ({
  apiKey: apiKey,
  language: language
}))(MapContainer)
