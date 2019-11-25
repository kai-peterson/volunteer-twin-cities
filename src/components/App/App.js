import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.css';

import { connect } from 'react-redux';

import DrawerNav from '../DrawerNav/DrawerNav'

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import MainListView from '../MainListView/MainListView';
import UserProfile from '../UserProfile/UserProfile';
import OrganizationDetails from '../OrganizationDetails/OrganizationDetails';
import CreateOrgView from '../CreateOrgView/CreateOrgView';
import ManageOrgsView from '../ManageOrgsView/ManageOrgsView';
import OrganizationProfile from '../OrganizationProfile/OrganizationProfile';
import CreateEventView from '../CreateEventView/CreateEventView';
import ManageOrgEvents from '../ManageOrgEvents/ManageOrgEvents';
import EventDetails from '../EventDetails/EventDetails';
import EventSignUp from '../EventSignUp/EventSignUp';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <div className="app-grid-container">
          {this.props.user.id && <DrawerNav dispatch={this.props.dispatch} />}
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={MainListView}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/profile"
              component={UserProfile}
            />
            <ProtectedRoute
              exact
              path="/home/details/:id"
              component={OrganizationDetails}
            />
            <ProtectedRoute
              exact
              path="/home/details/:id/event/:event_id"
              component={EventSignUp}
            />
            <ProtectedRoute
              exact
              path="/profile/create"
              component={CreateOrgView}
            />
            <ProtectedRoute
              exact
              path="/profile/manage"
              component={ManageOrgsView}
            />
            <ProtectedRoute
              exact
              path="/profile/manage/organization/:id"
              component={OrganizationProfile}
            />
            <ProtectedRoute
              exact
              path="/profile/manage/organization/:id/create/event"
              component={CreateEventView}
            />
            <ProtectedRoute
              exact
              path="/profile/manage/organization/:id/manage/events"
              component={ManageOrgEvents}
            />
            <ProtectedRoute
              exact
              path="/profile/manage/organization/:id/manage/events/:event_id"
              component={EventDetails}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(App);
