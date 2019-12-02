import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import axios from 'axios'
import './Map.css'

const mapStyles = {
    width: '100%',
    height: '65%',
    maxWidth: '100%'
};

class MyMap extends Component {
    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {},         //Shows the infoWindow to the selected place upon a marker
        location: {
            address: '',
            lat: 44.986656,
            lng: -93.258133,
        },
    };

    componentDidMount() {
        axios({
            type: 'GET',
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            params: {
                address: this.props.address,
                key: process.env.REACT_APP_MAPS_API_KEY
            }
        }).then((response) => {
            console.log(response.data.results[0])
            this.setState({
                location: {
                    address: response.data.results[0].formatted_address,
                    lat: response.data.results[0].geometry.location.lat,
                    lng: response.data.results[0].geometry.location.lng
                }
            })
        })
    }

    onMarkerClick = (props, marker, e) => {
        console.log(props)
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    handleChange = (event) => {
        this.setState({
            newAddress: event.target.value
        })
    }

    render() {
        return (
            <div className="map-container">
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                    lat: this.state.location.lat,
                    lng: this.state.location.lng
                }}
                center={{
                    lat: this.state.location.lat,
                    lng: this.state.location.lng
                }}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    title={this.state.location.address}
                    name={this.state.location.address}
                    position={{ lat: this.state.location.lat, lng: this.state.location.lng }} />
                <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h4>{this.state.selectedPlace.name}</h4>
                        </div>
                    </InfoWindow>
            </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAPS_API_KEY
})(MyMap);
