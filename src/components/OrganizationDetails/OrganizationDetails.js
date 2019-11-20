import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OrganizationDetails.css'

import DetailsNavBar from '../DetailsNavBar/DetailsNavBar';
import ImageCarousel from '../ImageCarousel/ImageCarousel';

class OrganizationDetails extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_ORG_DETAILS', payload: this.props.match.params.id })
    }

    render() {
        return (
            <>
                <div className="details-nav-container">
                    <DetailsNavBar />
                </div>
                <div className="details-container">
                    <h1 className="details-header">
                        {this.props.orgsInfoReducer.orgDetailsReducer.name}
                    </h1>
                    <p className="details-type">{this.props.orgsInfoReducer.orgDetailsReducer.type}</p>
                    <h3 className="details-subheader">Mission</h3>
                    <p className="details-body">{this.props.orgsInfoReducer.orgDetailsReducer.mission}</p>
                    <h3 className="details-subheader">Message to Volunteers</h3>
                    <p className="details-body">{this.props.orgsInfoReducer.orgDetailsReducer.message}</p>
                    <div className="carousel-container">
                    <ImageCarousel />
                    </div>
                </div>
            </>
        )
    }
};

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(OrganizationDetails);
