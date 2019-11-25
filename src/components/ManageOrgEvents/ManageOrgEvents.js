import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './ManageOrgEvents.css'

import OrganizationListView from '../OrganizationListView/OrganizationListView'

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
                <h1 className="manage-orgs-header" style={this.props.style}>Manage Events</h1>
                <div className="organization-list-container">
                    <OrganizationListView style={{ height: '100%' }} listItems={this.props.eventsRootReducer.eventsReducer} handleClick={this.handleClick} />
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
