import React from 'react';
import { connect } from 'react-redux';
import './OrganizationList.css'

// this could also be written with destructuring parameters as:
// const OrganizationList = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const OrganizationList = (props) => (
  <>
    <span>
      <h1 id="welcome">
        Welcome, {props.user.username}!
      </h1>
    </span>
    <p>Your ID is: {props.user.id}</p>
  </>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(OrganizationList);
