import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './ManageOrgsView.css'

import OrganizationList from '../OrganizationList/OrganizationList';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
                <ArrowBackIcon onClick={() => this.props.history.push(`/profile`)} viewBox="0 0 48 48" className="back-icon" />
                <div className="organization-list-container">
                <h3 className="manage-orgs-header">Manage Organizations</h3>
                <p className="orange-line-centered"></p>
                <OrganizationList style={{height: '100%'}} listItems={this.props.orgsInfoReducer.setUserOrgsReducer} handleClick={this.handleClick}/>
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
