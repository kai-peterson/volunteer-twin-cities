import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './EventDetails.css';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import dateFormat from 'dateformat';
import DatePicker from 'react-datepicker';

import UserList from '../UserList/UserList'

class EventDetails extends Component {
    state = {
        editMode: false,
        eventInfo: {
            name: '',
            description: '',
            start: new Date(),
            end: new Date(),
            reqs: '',
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_ORG_DETAILS', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'GET_EVENT_DETAILS', payload: this.props.match.params.event_id })
        this.props.dispatch({ type: 'GET_EVENT_USERS', payload: this.props.match.params.event_id })
    }

    handleModeSwitch = (mode) => {
        if (mode === 'edit') {
            this.setState({
                editMode: !this.state.editMode,
                eventInfo: {
                    name: this.props.eventsRootReducer.eventDetailsReducer.name,
                    description: this.props.eventsRootReducer.eventDetailsReducer.event_description,
                    start: new Date(this.props.eventsRootReducer.eventDetailsReducer.event_start),
                    end: new Date(this.props.eventsRootReducer.eventDetailsReducer.event_end),
                    reqs: this.props.eventsRootReducer.eventDetailsReducer.reqs,
                    address: this.props.eventsRootReducer.eventDetailsReducer.address,
                }
            })
        }
        else if (mode === 'save') {
            console.log('dispatch to PUT route');
            this.props.dispatch({ type: 'UPDATE_EVENT', payload: { ...this.state.eventInfo, event_id: this.props.match.params.event_id } })
            this.setState({
                editMode: !this.state.editMode
            })
        }
    }

    handleChange = (prop, event) => {
        this.setState({
            eventInfo: {
                ...this.state.eventInfo,
                [prop]: event.target.value
            }
        })
    }

    handleDateChange = (prop, date) => {
        this.setState({
            eventInfo: {
                ...this.state.eventInfo,
                [prop]: date
            }
        })
    }

    handleDelete = () => {
        const confirm = window.confirm('are you sure you want to delete this event?')
        if (confirm) {
            this.props.dispatch({ type: 'DELETE_EVENT', payload: { event_id: this.props.match.params.event_id, org_id: this.props.match.params.id } })
            this.props.history.push(`/profile/manage/organization/${this.props.match.params.id}/manage/events`)
        }

    }

    render() {
        return (
            <>
                <ArrowBackIcon onClick={() => this.props.history.push(`/profile/manage/organization/${this.props.match.params.id}/manage/events`)} viewBox="0 0 36 36" className="back-icon" />
                <div className="event_details-container">
                    {/* <h1 className="event-details-org-header">{this.props.orgsInfoReducer.orgDetailsReducer.name}</h1> */}
                    <h3 className="manage-orgs-header">Volunteers Signed Up</h3>
                    <p style={{ minHeight: '2px' }} className="orange-line-centered"></p>
                    <UserList listItems={this.props.eventsRootReducer.eventUsersReducer} handleClick={this.handleClick} />
                    {!this.state.editMode &&
                        <>
                            <h4 className="org-profile-subheader">Event name</h4>
                            <p className="orange-line-event"></p>
                            <p>{this.props.eventsRootReducer.eventDetailsReducer.name}</p>
                            <h4 className="org-profile-subheader">Description</h4>
                            <p className="orange-line-event"></p>
                            <p>{this.props.eventsRootReducer.eventDetailsReducer.event_description}</p>
                            <h4 className="org-profile-subheader">Event address</h4>
                            <p className="orange-line-event"></p>
                            <p>{this.props.eventsRootReducer.eventDetailsReducer.address}</p>
                            <h4 className="org-profile-subheader">Start</h4>
                            <p className="orange-line-event"></p>
                            <p>{dateFormat(this.props.eventsRootReducer.eventDetailsReducer.event_start, 'dddd, mmmm dS, yyyy @ h:MM TT')}</p>
                            <h4 className="org-profile-subheader">End</h4>
                            <p className="orange-line-event"></p>
                            <p>{dateFormat(this.props.eventsRootReducer.eventDetailsReducer.event_end, 'dddd, mmmm dS, yyyy @ h:MM TT')}</p>
                            <h4 className="org-profile-subheader">Special requirements</h4>
                            <p className="orange-line-event"></p>
                            <p>{this.props.eventsRootReducer.eventDetailsReducer.reqs}</p>
                            <div className="action-buttons-container">
                                <Button className="action-button" onClick={this.handleDelete} variant="outlined">DELETE</Button>
                                <Button className="action-button" variant="outlined" onClick={() => this.handleModeSwitch('edit')}>EDIT</Button>
                            </div>
                        </>
                    }
                    {this.state.editMode &&
                        <>
                            <h4 className="org-profile-subheader">Event name</h4>
                            <p className="orange-line-event"></p>
                            <input className="org-edit-header" onChange={(event) => this.handleChange('name', event)} type="text" value={this.state.eventInfo.name} />
                            <h4 className="org-profile-subheader">Description</h4>
                            <p className="orange-line-event"></p>
                            <input className="org-edit-subheader" onChange={(event) => this.handleChange('description', event)} type="text" value={this.state.eventInfo.description} />
                            <h4 className="org-profile-subheader">Event address</h4>
                            <p className="orange-line-event"></p>
                            <input className="org-edit-subheader" onChange={(event) => this.handleChange('address', event)} type="text" value={this.state.eventInfo.address} />
                            <h4 className="org-profile-subheader">Start date/time</h4>
                            <p className="orange-line-event"></p>
                            {/* <input className="org-edit-subheader" onChange={(event) => this.handleChange('start', event)} type="text" value={this.state.eventInfo.start} /> */}
                            <DatePicker
                                selected={this.state.eventInfo.start}
                                onSelect={(date) => this.handleDateChange('start', date)}
                                onChange={(date) => this.handleDateChange('start', date)}
                                showTimeSelect
                                dateFormat="Pp"
                            />
                            <h4 className="org-profile-subheader">End date/time</h4>
                            <p className="orange-line-event"></p>
                            {/* <input className="org-edit-subheader" onChange={(event) => this.handleChange('end', event)} type="text" value={this.state.eventInfo.end} /> */}
                            <DatePicker
                                selected={this.state.eventInfo.end}
                                onSelect={(date) => this.handleDateChange('end', date)}
                                onChange={(date) => this.handleDateChange('end', date)}
                                showTimeSelect
                                dateFormat="Pp"
                            />
                            <h4 className="org-profile-subheader">Special requirements</h4>
                            <p className="orange-line-event"></p>
                            <input className="org-edit-subheader" onChange={(event) => this.handleChange('reqs', event)} type="text" value={this.state.eventInfo.reqs} />
                            <div className="action-buttons-container">
                                <Button className="action-button" onClick={() => this.setState({ editMode: !this.state.editMode })} variant="outlined">CANCEL</Button>
                                <Button className="action-button" variant="outlined" onClick={() => this.handleModeSwitch('save')}>SAVE</Button>
                            </div>
                        </>
                    }
                    {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
                    {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
                </div>
            </>
        )
    }
};

const mapStateToProps = state => {
    return state;
};

export default withRouter(connect(mapStateToProps)(EventDetails));
