import React from 'react';
import { connect } from 'react-redux';
import './UserProfile.css'

import { Button } from '@material-ui/core'
import OrganizationListView from '../OrganizationListView/OrganizationListView'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const UserProfile = (props) => (
  <div className="profile-container">
    <img className="profile-pic" src={props.user.profile_pic} />
    <h1 className="profile-username">{props.user.username}</h1>
    <h2>Upcoming events:</h2>
    <OrganizationListView />
    <div className="profile-buttons-container">
      <Button className="profile-button" variant="contained">Create Organization</Button>
      <Button className="profile-button" variant="contained">Manage Organizations</Button>
    </div>
    {/* <pre>{JSON.stringify(props.user, null, 2)}</pre> */}
  </div>
);

const mapReduxStateToProps = reduxState => {
  return reduxState
}

export default connect(mapReduxStateToProps)(UserProfile);
