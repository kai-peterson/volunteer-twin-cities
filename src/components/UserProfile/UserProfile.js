import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import './UserProfile.css'

import { Button } from '@material-ui/core'
import OrganizationListView from '../OrganizationListView/OrganizationListView'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class UserProfile extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'GET_USER_EVENTS'})
  }

  handleClick = () => {
    
  }

  render() {
    return (
      <div className="profile-container">
        <img className="profile-pic" src={this.props.user.profile_pic} alt="" />
        <h1 className="profile-username">{this.props.user.username}</h1>
        <h2>Upcoming events:</h2>
        <OrganizationListView style={{ height: '38vh' }} listItems={this.props.eventsRootReducer.userEventsReducer} handleClick={this.handleClick}/>
        <div className="profile-buttons-container">
          <Button onClick={() => this.props.history.push('/profile/create')} className="profile-button" variant="contained">Create Organization</Button>
          <Button onClick={() => this.props.history.push('/profile/manage')} className="profile-button" variant="contained">Manage Organizations</Button>
        </div>
        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
      </div>
    )
  }
};

const mapReduxStateToProps = reduxState => {
  return reduxState
}

export default withRouter(connect(mapReduxStateToProps)(UserProfile));
