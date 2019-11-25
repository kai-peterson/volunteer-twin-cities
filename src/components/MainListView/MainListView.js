import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MainListView.css'

import OrganizationCard from '../OrganizationCard/OrganizationCard'

// this could also be written with destructuring parameters as:
// const MainListView = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class MainListView extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_ORGS' })
  }

  render() {
    return (
      <>
        <h1 className="main-view-header">
          Volunteer Twin Cities
        </h1>
        <div className="organization-card">
          {this.props.orgsInfoReducer.setOrgsReducer.map( (org, i) => 
            <OrganizationCard org={org} key={i}/>
          )}
        </div>
      </>
    )
  }
};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => {
  return state;
};

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MainListView);
