import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './ManageOrgsView.css'

import OrganizationListView from '../OrganizationListView/OrganizationListView'

class ManageOrgsView extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'GET_USER_ORGS'})
    }

    handleClick = (id) => {
        this.props.history.push(`/profile/manage/organization/${id}`)
    }

    render() {
        return (
            <>
                <h1 className="manage-orgs-header">Manage Organizations</h1>
                <div className="organization-list-container">
                <OrganizationListView style={{height: '100%'}} listItems={this.props.orgsInfoReducer.setUserOrgsReducer} handleClick={this.handleClick}/>
                </div>
        {/* <pre>{JSON.stringify(this.props.orgsInfoReducer.setUserOrgsReducer, null, 2)}</pre> */}
            </>
        );
    }
};

const mapReduxStateToProps = reduxState => {
    return reduxState
}

export default withRouter(connect(mapReduxStateToProps)(ManageOrgsView));
