import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core'
import './EventSignUp.css'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import dateFormat from 'dateformat';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import MyMap from '../Map/Map'

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
                <ArrowBackIcon onClick={this.handleBack} viewBox="0 0 48 48" className="back-icon" />
                <div className="event_details-container">
                    <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                        <h3 style={{ marginBottom: '22px', textTransform: 'uppercase' }} className="org-profile-subheader">Event details</h3>
                        <p style={{ marginBottom: '8px' }} className="orange-line-event"></p>
                    </div>
                    <List style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingLeft: '15px', paddingRight: '15px' }} component="nav" aria-label="upcoming events list">
                        <ListItem style={{ display: 'unset' }} dense={true} disableGutters={true} key={this.props.eventsRootReducer.eventDetailsReducer.id}>
                            <ListItemText className="temp-list-item" primaryTypographyProps={{ variant: 'h6' }} primary={this.props.eventsRootReducer.eventDetailsReducer.name} />
                            {dateFormat(this.props.eventsRootReducer.eventDetailsReducer.event_start) === dateFormat(this.props.eventsRootReducer.eventDetailsReducer.event_end) ?
                                <ListItemText className="temp-list-item" secondary={dateFormat(this.props.eventsRootReducer.eventDetailsReducer.event_start, 'dddd, mmmm dS • h:MM TT')} /> :
                                <ListItemText className="temp-list-item" secondary={`${dateFormat(this.props.eventsRootReducer.eventDetailsReducer.event_start, 'ddd, mmm dS • h:MM TT')} - ${dateFormat(this.props.eventsRootReducer.eventDetailsReducer.event_end, 'dddd, mmm dS • h:MM TT')}`} />
                            }
                            {/* <ListItemText secondary={dateFormat(Date(item.event_start), 'fullDate')} /> */}
                            <p className="spacer"></p>
                            <ListItemText style={{ marginTop: '18px' }} className="temp-list-item" primaryTypographyProps={{ variant: 'body1' }} primary={this.props.eventsRootReducer.eventDetailsReducer.event_description} />
                        </ListItem>
                    </List>
                    {/* <p>{this.props.eventsRootReducer.eventDetailsReducer.name}</p>
                    <h4 className="org-profile-subheader">Description</h4>
                    <p className="orange-line-event"></p>
                    <p>{this.props.eventsRootReducer.eventDetailsReducer.event_description}</p>
                    <h4 className="org-profile-subheader">Start date/time</h4>
                    <p className="orange-line-event"></p>
                    <p>{dateFormat(this.props.eventsRootReducer.eventDetailsReducer.event_start, 'dddd, mmmm dS, yyyy @ h:MM TT')}</p>
                    <h4 className="org-profile-subheader">End date/time</h4>
                    <p className="orange-line-event"></p>
                    <p>{dateFormat(this.props.eventsRootReducer.eventDetailsReducer.event_end, 'dddd, mmmm dS, yyyy @ h:MM TT')}</p> */}
                    <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                        <h4 style={{textTransform: 'uppercase'}} className="org-profile-subheader">Special requirements</h4>
                        <p className="orange-line-event"></p>
                        <p>{this.props.eventsRootReducer.eventDetailsReducer.reqs}</p>
                    </div>
                    <MyMap address={this.props.eventsRootReducer.eventDetailsReducer.address} />
                    <h4 style={{paddingLeft: '18px', marginTop: '0'}} className="address-header">{this.props.eventsRootReducer.eventDetailsReducer.name}<p className="address-subheader">{this.props.eventsRootReducer.eventDetailsReducer.address}</p></h4>
                    {this.props.eventsRootReducer.eventDetailsReducer.address && <a style={{paddingLeft: '18px', paddingBottom: '10px'}} target="_blank" rel="noopener noreferrer" className="directions-link" href={`https://www.google.com/maps/dir/?api=1&destination=${this.props.eventsRootReducer.eventDetailsReducer.address.replace(/ /g, '+').replace(/,/g, '%2C')}`}>Click here for Directions in Google Maps</a>}
                    <Button style={{ maxWidth: '125px', backgroundColor: '#eaa44b', color: 'white', margin: '10px auto 15px auto' }} onClick={this.handleClick} variant="contained">Sign Up</Button>
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
