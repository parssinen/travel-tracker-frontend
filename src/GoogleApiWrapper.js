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
      markers: [],
      newTitle: '',
      newText: '',
      activeMenuItem: 'info'
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

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  updateMarker = async event => {
    const editedMarker = {
      ...this.state.activeMarker,
      title: this.state.newTitle,
      text: this.state.newText
    }
    const updatedMarker = await travelService.update(
      editedMarker.id,
      editedMarker
    )
    console.log('lähti', editedMarker)
    console.log('palautui', updatedMarker)
    const markers = this.state.markers.filter(m => m.id !== editedMarker.id)
    await this.setState({
      activeMarker: updatedMarker,
      newTitle: updatedMarker.title,
      newText: updatedMarker.text,
      markers: markers.concat(updatedMarker),
      activeMenuItem: 'info'
    })
    console.log('NewTitle on nyt', this.state.newTitle)
    console.log('NewText on nyt', this.state.newText)
  }

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
        newTitle: '',
        newText: '',
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
    this.setState({
      selectedPlace: props,
      activeMarker: clickedMarker,
      newTitle: clickedMarker.title,
      newText: clickedMarker.text,
      modalOpen: true,
      activeMenuItem: 'info'
    })
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: {},
        newTitle: '',
        newText: '',
        modalOpen: false
      })
    }
  }

  onMapClicked = async (t, map, coord) => {
    const { latLng } = coord
    const lat = latLng.lat()
    const lng = latLng.lng()
    console.log('id', this.state.user)
    const newMarker = {
      user: this.state.user.id,
      title: '',
      text: '',
      position: {
        lat,
        lng
      }
    }
    try {
      const travel = await travelService.create(newMarker)
      await this.setState({
        markers: this.state.markers.concat(travel),
        activeMarker: travel,
        newTitle: travel.title,
        newText: travel.text,
        modalOpen: true,
        activeMenuItem: 'edit'
      })
    } catch (exception) {
      console.log(exception)
    }
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

  handleClose = () => this.setState({ modalOpen: false })

  setInfo = () => this.setState({ activeMenuItem: 'info' })
  setEdit = () => this.setState({ activeMenuItem: 'edit' })
  setSettings = () => this.setState({ activeMenuItem: 'settings' })

  render() {
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
          newTitle={this.state.newTitle}
          newText={this.state.newText}
          onRemoveSubmit={this.removeMarker}
          onEditSubmit={this.updateMarker}
          handleChange={this.handleFieldChange}
          active={this.state.activeMenuItem}
          setInfo={this.setInfo}
          setEdit={this.setEdit}
          setSettings={this.setSettings}
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
