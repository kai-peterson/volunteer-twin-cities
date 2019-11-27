import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './OrganizationDetails.css'

import DetailsNavBar from '../DetailsNavBar/DetailsNavBar';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import OrganizationListView from '../OrganizationListView/OrganizationListView';
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
                <h1 className="details-header">
                    {this.props.orgsInfoReducer.orgDetailsReducer.name}
                </h1>
                <p className="details-type">{this.props.orgsInfoReducer.orgDetailsReducer.type}</p>
                <div className="details-nav-container">
                    <DetailsNavBar />
                </div>
                {this.props.detailsNavReducer === 0 &&
                    <div className="details-container">

                        <h3 className="details-subheader">Mission</h3>
                        <p className="details-body">{this.props.orgsInfoReducer.orgDetailsReducer.mission}</p>
                        <h3 className="details-subheader">Message to Volunteers</h3>
                        <p className="details-body">{this.props.orgsInfoReducer.orgDetailsReducer.message}</p>
                        <div className="carousel-container">
                            <ImageCarousel />
                        </div>
                    </div>
                }
                {this.props.detailsNavReducer === 1 &&
                    <div className="details-container">
                        <h1 style={{ height: 'fit-content' }}>Events</h1>
                        <OrganizationListView style={{ height: 'fit-content', gridRowStart: 2, gridRowEnd: 2, gridColumnStart: 1, gridColumnEnd: 'span2' }} listItems={this.props.eventsRootReducer.eventsReducer} handleClick={this.handleClick} />
                    </div>
                }
                {this.props.detailsNavReducer === 2 &&
                    <div className="location-container">
                        <h2>Address: {this.props.orgsInfoReducer.orgDetailsReducer.address}</h2>
                        <Map address={this.props.orgsInfoReducer.orgDetailsReducer.address} />
                        <a className="directions-link" href="http://localhost:3000/#/home">Click here for Directions in Google Maps</a>
                        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
                    </div>

                }
            </div>
        )
    }
};

const mapStateToProps = state => {
    return state;
};

export default withRouter(connect(mapStateToProps)(OrganizationDetails));
