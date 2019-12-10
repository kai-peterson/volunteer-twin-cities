import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './UserProfile.css';

import { Button } from '@material-ui/core';
import EventList from '../EventList/EventList';
import OrganizationList from '../OrganizationList/OrganizationList'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class UserProfile extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_USER_EVENTS' })
    this.props.dispatch({ type: 'GET_PENDING_ORGS' })
  }

  handleClick = (id) => {
    this.props.history.push(`/home/details/pending/${id}`)
  }

  handleEventClick = (id) => {
  }

  render() {
    return (
      <div className="profile-container">
        <img className="profile-pic" src={this.props.user.profile_pic} alt="" />
        <h1 className="profile-username">{this.props.user.username}</h1>
        <h3 className="profile-subheader">My upcoming events</h3>
        <p className="orange-line orange-line-margins"></p>
        <EventList listItems={this.props.eventsRootReducer.userEventsReducer} handleClick={this.handleEventClick} />
        <div className="profile-buttons-container">
          <Button onClick={() => this.props.history.push('/profile/create')} className="profile-button" variant="contained">Create Organization</Button>
          <Button onClick={() => this.props.history.push('/profile/manage')} className="profile-button" variant="contained">Manage Organizations</Button>
        </div>
        {this.props.user.access_level === 1 &&
          <>
            <h2>Admin-only:<br />Orgs Awaiting Approval</h2>
            <OrganizationList listItems={this.props.orgsInfoReducer.setPendingOrgsReducer} handleClick={this.handleClick} />
            <pre>{JSON.stringify(this.props.orgsInfoReducer, null, 2)}</pre>
          </>
        }
        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
      </div>
    )
  }
};

const mapReduxStateToProps = reduxState => {
  return reduxState
}

export default withRouter(connect(mapReduxStateToProps)(UserProfile));
