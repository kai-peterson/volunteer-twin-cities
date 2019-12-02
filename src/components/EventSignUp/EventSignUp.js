import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core'
import './EventSignUp.css'

import dateFormat from 'dateformat';
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
        this.props.dispatch({ type: 'SET_NAV', payload: 1 })
        this.props.history.push(`/home/details/${this.props.match.params.id}`)
    }

    render() {
        return (
            <>
                <ArrowBackIcon onClick={this.handleBack} viewBox="0 0 36 36" className="back-icon" />
                <div className="event_details-container">
                    <h4 className="org-profile-subheader">Event name</h4>
                    <p className="orange-line-event"></p>
                    <p>{this.props.eventsRootReducer.eventDetailsReducer.name}</p>
                    <h4 className="org-profile-subheader">Description</h4>
                    <p className="orange-line-event"></p>
                    <p>{this.props.eventsRootReducer.eventDetailsReducer.event_description}</p>
                    <h4 className="org-profile-subheader">Start date/time</h4>
                    <p className="orange-line-event"></p>
                    <p>{dateFormat(this.props.eventsRootReducer.eventDetailsReducer.event_start, 'dddd, mmmm dS, yyyy @ h:MM TT')}</p>
                    <h4 className="org-profile-subheader">End date/time</h4>
                    <p className="orange-line-event"></p>
                    <p>{dateFormat(this.props.eventsRootReducer.eventDetailsReducer.event_end, 'dddd, mmmm dS, yyyy @ h:MM TT')}</p>
                    <h4 className="org-profile-subheader">Special requirements</h4>
                    <p className="orange-line-event"></p>
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
