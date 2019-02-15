import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import travelService from './services/travels'
import AddModal from './AddModal'

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
      markers: [],
      newTitle: '',
      newText: '',
      activeMenuItem: 'info',
      open: false
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

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

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
    const markers = this.state.markers.filter(m => m.id !== editedMarker.id)
    await this.setState({
      activeMarker: updatedMarker,
      newTitle: updatedMarker.title,
      newText: updatedMarker.text,
      markers: markers.concat(updatedMarker),
      activeMenuItem: 'info'
    })
  }

  removeMarker = async () => {
    const toRemove = this.state.activeMarker
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
      modalOpen: false,
      open: false
    })
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

  handleModalClose = props => {
    console.log(this.state.newText, '<-teksti titteli ->', this.state.newTitle)
    if (this.state.newText.length === 0 && this.state.newTitle.length === 0) {
      this.open()
    } else {
      this.setState({
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
          height: '100%',
          width: '100%',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          padding: 0
        }}>
        <AddModal
          open={this.state.modalOpen}
          close={this.handleModalClose}
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
          confirmOpen={this.state.open}
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

const styles = {}

export default GoogleApiWrapper(({ apiKey, language }) => ({
  apiKey: apiKey,
  language: language
}))(MapContainer)
