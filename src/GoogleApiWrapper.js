import React, { Component } from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'

const mapStyles = {
    width: '50%',
    height: '50%'
}

export class MapContainer extends Component {
    state = {
        windowInfo: false,
        activeMarker: {},
        selectedPlace: {}
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    render() {
        return (
            <Map google={this.props.google}
                zoom={2}
                style={mapStyles}
                initialCenter={{ lat: 51.4778, lng: -0.0014 }}>
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Kenyatta International Convention Centre'}
                />
                <InfoWindow marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}>
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>)
    }
}

export default GoogleApiWrapper(({ apiKey, language }) => ({
    apiKey: apiKey,
    language: language
}))(MapContainer)


