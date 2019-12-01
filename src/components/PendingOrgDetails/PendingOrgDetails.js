import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import './PendingOrgDetails.css'

import { Button } from '@material-ui/core'

class PendingOrgDetails extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_PENDING_DETAILS', payload: this.props.match.params.id })
    }

    handleClick = (action) => {
        if (action === 'approve') {
            this.props.dispatch({ type: 'CREATE_ORG', payload: this.props.orgsInfoReducer.setPendingDetailsReducer })
            this.props.dispatch({ type: 'UPDATE_PENDING_STATUS', payload: { id: this.props.match.params.id, status: 'approved' } })
            this.props.history.push('/profile')
        }
        else if (action === 'deny') {
            this.props.dispatch({ type: 'UPDATE_PENDING_STATUS', payload: { id: this.props.match.params.id, status: 'denied' } })
            this.props.history.push('/profile')
        }
        else if (action === 'change') {
            this.props.dispatch({ type: 'UPDATE_PENDING_STATUS', payload: { id: this.props.match.params.id, status: 'changes_requested' } })
            this.props.history.push('/profile')
        }
    }

    render() {
        return (
            <>
                <div className="org-profile-container">
                    <img className="profile-pic" src={this.props.user.profile_pic} alt="" />
                    <h1 className="profile-username">{this.props.orgsInfoReducer.setPendingDetailsReducer.name}</h1>
                    <h4>{this.props.orgsInfoReducer.setPendingDetailsReducer.type}</h4>
                    <h4>{this.props.orgsInfoReducer.setPendingDetailsReducer.address}</h4>
                    <h4>Intro</h4>
                    <p className="create-org-subheader">{this.props.orgsInfoReducer.setPendingDetailsReducer.intro}</p>
                    <h4>Mission</h4>
                    <p className="create-org-subheader">{this.props.orgsInfoReducer.setPendingDetailsReducer.mission}</p>
                    <h4>Message</h4>
                    <p className="create-org-subheader">{this.props.orgsInfoReducer.setPendingDetailsReducer.message}</p>
                    {/* <h4 className="create-org-subheader">Add image</h4> */}
                    <div className="profile-buttons-container">
                        <Button onClick={() => this.handleClick('approve')} className="profile-button edit-button" variant="outlined">Approve</Button>
                        <Button onClick={() => this.handleClick('deny')} className="profile-button edit-button" variant="outlined">Deny</Button>
                        <Button onClick={() => this.handleClick('change')} className="profile-button edit-button" variant="outlined">Request Change</Button>
                    </div>
                    {/* <pre>{JSON.stringify(props.user, null, 2)}</pre> */}
                </div>
            </>
        )
    }
};

const mapReduxStateToProps = reduxState => {
    return reduxState
}

export default withRouter(connect(mapReduxStateToProps)(PendingOrgDetails));
