import React from 'react';
import './UserProfile.css'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const UserProfile = () => (
  <div>
    <p className="profile-header">
      Profile Page
    </p>
  </div>
);

export default UserProfile;
