import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core'
import './EventSignUp.css'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class EventSignUp extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_ORG_DETAILS', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'GET_EVENT_DETAILS', payload: this.props.match.params.event_id })
    }

    handleClick = () => {
        let confirm = window.confirm('Are you sure?')
        if (confirm) {
            this.props.dispatch({ type: 'ADD_USER_EVENT', payload: this.props.match.params.event_id })
        }
    }

    handleBack = () => {
        this.props.dispatch({ type: 'SET_NAV', payload: 1})
        this.props.history.push(`/home/details/${this.props.match.params.id}`)
    }

    render() {
        return (
            <>
                <ArrowBackIcon onClick={this.handleBack} fontSize="large" className="back-icon" />
                <h1 className="event-details-org-header">{this.props.orgsInfoReducer.orgDetailsReducer.name}</h1>
                <div className="event_details-container">
                    <h1>{this.props.eventsRootReducer.eventDetailsReducer.name}</h1>
                    <p>{this.props.eventsRootReducer.eventDetailsReducer.event_description}</p>
                    <p>{this.props.eventsRootReducer.eventDetailsReducer.event_start}</p>
                    <p>{this.props.eventsRootReducer.eventDetailsReducer.event_end}</p>
                    <p>{this.props.eventsRootReducer.eventDetailsReducer.reqs}</p>
                    <Button onClick={this.handleClick} variant="contained">Sign Up</Button>
                    {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
                </div>
            </>
        )
    }
};

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(EventSignUp);
