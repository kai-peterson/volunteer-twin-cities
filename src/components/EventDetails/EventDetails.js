import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './EventDetails.css';

import OrganizationListView from '../OrganizationListView/OrganizationListView'

class EventDetails extends Component {
    state = {
        editMode: false,
        eventInfo: {
            name: '',
            description: '',
            start: '',
            end: '',
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
                    start: this.props.eventsRootReducer.eventDetailsReducer.event_start,
                    end: this.props.eventsRootReducer.eventDetailsReducer.event_end,
                    reqs: this.props.eventsRootReducer.eventDetailsReducer.reqs,
                    address: this.props.eventsRootReducer.eventDetailsReducer.address,
                }
            })
        }
        else if (mode === 'save') {
            console.log('dispatch to PUT route');
            this.props.dispatch({type: 'UPDATE_EVENT', payload: {...this.state.eventInfo, event_id: this.props.match.params.event_id}})
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

    handleClick = () => {

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
                <h1 className="event-details-org-header">{this.props.orgsInfoReducer.orgDetailsReducer.name}</h1>
                <div className="event_details-container">
                    <h2>Volunteers Signed Up</h2>
                    <OrganizationListView listItems={this.props.eventsRootReducer.eventUsersReducer} handleClick={this.handleClick} />
                    {!this.state.editMode &&
                        <>
                            <h1>{this.props.eventsRootReducer.eventDetailsReducer.name}</h1>
                            <p>{this.props.eventsRootReducer.eventDetailsReducer.event_description}</p>
                            <p>{this.props.eventsRootReducer.eventDetailsReducer.address}</p>
                            <p>{this.props.eventsRootReducer.eventDetailsReducer.event_start}</p>
                            <p>{this.props.eventsRootReducer.eventDetailsReducer.event_end}</p>
                            <p>{this.props.eventsRootReducer.eventDetailsReducer.reqs}</p>
                            <div className="profile-buttons-container">
                                <Button onClick={this.handleDelete} variant="contained" color="secondary">DELETE</Button>
                                <Button className="action-button" variant="contained" color="primary" onClick={() => this.handleModeSwitch('edit')}>Edit</Button>
                            </div>
                        </>
                    }
                    {this.state.editMode &&
                        <>

                            <input className="input-header" onChange={(event) => this.handleChange('name', event)} type="text" value={this.state.eventInfo.name}/>
                            <input className="input-text" onChange={(event) => this.handleChange('description', event)} type="text" value={this.state.eventInfo.description}/>
                            <input className="input-text" onChange={(event) => this.handleChange('address', event)} type="text" value={this.state.eventInfo.address}/>
                            <input className="input-text" onChange={(event) => this.handleChange('start', event)} type="text" value={this.state.eventInfo.start}/>
                            <input className="input-text" onChange={(event) => this.handleChange('end', event)} type="text" value={this.state.eventInfo.end}/>
                            <input className="input-text" onChange={(event) => this.handleChange('reqs', event)} type="text" value={this.state.eventInfo.reqs}/>
                            <div className="profile-buttons-container">
                                <Button onClick={this.handleDelete} variant="contained" color="secondary">DELETE</Button>
                                <Button className="action-button" variant="contained" color="primary" onClick={() => this.handleModeSwitch('save')}>Save</Button>
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
