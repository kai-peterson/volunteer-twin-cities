import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './OrganizationDetails.css'

import DetailsNavBar from '../DetailsNavBar/DetailsNavBar';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import EventList from '../EventList/EventList';
import Map from '../Map/Map'

class OrganizationDetails extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_ORG_DETAILS', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'GET_ORG_IMAGES', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'GET_ORG_EVENTS', payload: this.props.match.params.id })
    }

    componentWillUnmount() {
        this.props.dispatch({ type: 'SET_NAV', payload: 0 })
    }

    handleClick = (eventId) => {
        this.props.history.push(`/home/details/${this.props.match.params.id}/event/${eventId}`)
    }



    render() {
        return (
            <div className="full-details-container">
                <h2 className="details-header">
                    {this.props.orgsInfoReducer.orgDetailsReducer.name}
                    <p className="details-type">{this.props.orgsInfoReducer.orgDetailsReducer.type}</p>
                </h2>
                <div className="details-nav-container">
                    <DetailsNavBar /> 
                </div>
                {this.props.detailsNavReducer === 0 &&
                    <div className="details-container">

                        <h3 className="details-subheader">Mission</h3>
                        <p className="orange-line orange-line-margins"></p>
                        <p className="details-body">{this.props.orgsInfoReducer.orgDetailsReducer.mission}</p>
                        <h3 className="details-subheader">Message to Volunteers</h3>
                        <p className="orange-line orange-line-margins"></p>
                        <p className="details-body">{this.props.orgsInfoReducer.orgDetailsReducer.message}</p>
                        <div className="carousel-container">
                            <ImageCarousel />
                        </div>
                    </div>
                }
                {this.props.detailsNavReducer === 1 &&
                    <div className="details-container">
                        <h3 className="details-subheader">Events</h3>
                        <p className="orange-line orange-line-margins"></p>
                        <EventList style={{ height: 'fit-content', gridColumnStart: 1, gridColumnEnd: 'span2' }} listItems={this.props.eventsRootReducer.eventsReducer} handleClick={this.handleClick} />
                    </div>
                }
                {this.props.detailsNavReducer === 2 &&
                    <div className="details-container">
                        <h3 className="details-subheader">Location</h3>
                        <p className="orange-line orange-line-margins"></p>
                        <Map address={this.props.orgsInfoReducer.orgDetailsReducer.address} />
                        <h4 className="address-header">{this.props.orgsInfoReducer.orgDetailsReducer.name}<p className="address-subheader">{this.props.orgsInfoReducer.orgDetailsReducer.address}</p></h4>
                        <a target="_blank" rel="noopener noreferrer" className="directions-link" href={`https://www.google.com/maps/dir/?api=1&destination=${this.props.orgsInfoReducer.orgDetailsReducer.address.replace(/ /g, '+').replace(/,/g, '%2C')}`}>Click here for Directions in Google Maps</a>
                        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
                    </div>

                }
                {/* {JSON.stringify(this.props.eventsRootReducer, null, 2)} */}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return state;
};

export default withRouter(connect(mapStateToProps)(OrganizationDetails));
