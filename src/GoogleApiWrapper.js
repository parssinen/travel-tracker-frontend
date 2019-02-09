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
  Button
} from 'semantic-ui-react'

import MessageBlock from './MessageBlock'

const mapStyles = {
  width: 'auto',
  height: 'auto'
}

const inlineStyle = {
  modal: {
    marginTop: '-250px',
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
      markers: [
        {
          title: 'Tässä on nuppi',
          name: 'The marker`s title will appear as a tooltip.',
          position: { lat: 37.778519, lng: -122.40564 }
        }
      ]
    }
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      modalOpen: true
    })

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  onMapClicked = (t, map, coord) => {
    const { latLng } = coord
    const lat = latLng.lat()
    const lng = latLng.lng()
    this.setState({
      markers: this.state.markers.concat({
        title: 'Tässä on nuppi!',
        name: 'Tähän tulee vaikka minkälaista tekstiä',
        position: { lat: lat, lng: lng }
      })
    })
  }

  renderMarkers = () => {
    const markers = this.state.markers
    return markers.map(marker => (
      <Marker
        name={marker.name}
        position={marker.position}
        onClick={this.onMarkerClick}
      />
    ))
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <div>
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          style={inlineStyle.modal}
          closeIcon>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Image
              wrapped
              size='medium'
              src='https://react.semantic-ui.com/images/avatar/large/rachel.png'
            />
            <Modal.Description>
              <Header>Owner: {this.state.user.username}</Header>
              <p>
                We've found the following gravatar image associated with your
                e-mail address.
              </p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <MessageBlock name={this.state.user.username} />
        <Map
          google={this.props.google}
          zoom={2}
          style={mapStyles}
          initialCenter={{ lat: 0, lng: 0 }}
          onClick={this.onMapClicked}>
          {/*<InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          size='big'>
          <Item relaxed>
            <div>{this.state.activeMarker === null ?
              <h4>...</h4>
              :
              <div><h2>{this.state.activeMarker.title}</h2>
                <h4>{this.state.activeMarker.name}</h4></div>
            }<Button icon>
                <Icon name='expand'
                />
              </Button></div>
          </Item>
          </InfoWindow>*/}
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
