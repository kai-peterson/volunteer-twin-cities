import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './ManageOrgEvents.css'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import EventList from '../EventList/EventList'

class ManageOrgsView extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'GET_ORG_EVENTS', payload: this.props.match.params.id})
    }

    handleClick = (eventId) => {
        this.props.history.push(`/profile/manage/organization/${this.props.match.params.id}/manage/events/${eventId}`)
    }

    render() {
        return (
            <>
                <ArrowBackIcon onClick={() => this.props.history.push(`/profile/manage/organization/${this.props.match.params.id}`)} viewBox="0 0 48 48" className="back-icon" />
                <div className="organization-list-container">
                    <h3 className="manage-orgs-header">Manage Events</h3>
                    <p className="orange-line-centered"></p>
                    <EventList style={{ height: '100%' }} listItems={this.props.eventsRootReducer.eventsReducer} handleClick={this.handleClick} />
                </div>
                {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
            </>
        );
    }
};

const mapReduxStateToProps = reduxState => {
    return reduxState
}

export default withRouter(connect(mapReduxStateToProps)(ManageOrgsView));
