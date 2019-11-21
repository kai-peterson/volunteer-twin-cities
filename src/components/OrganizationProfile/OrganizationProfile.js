import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import './OrganizationProfile.css'

import { Button } from '@material-ui/core'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class OrganizationProfile extends Component {
    state = {
        orgInfo: {
            name: '',
            type: '',
            address: '',
            intro: '',
            mission: '',
            message: '',
        },
        mode: false,
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_ORG_DETAILS', payload: this.props.match.params.id })
    }
    
    handleChange = (prop, event) => {
        this.setState({
            orgInfo: {
                ...this.state.orgInfo,
                [prop]: event.target.value
            }
        })
    }

    switchToEditMode = () => {
        this.setState({
            orgInfo: {
                name: this.props.orgsInfoReducer.orgDetailsReducer.name,
                type: this.props.orgsInfoReducer.orgDetailsReducer.type,
                address: this.props.orgsInfoReducer.orgDetailsReducer.address,
                intro: this.props.orgsInfoReducer.orgDetailsReducer.intro,
                mission: this.props.orgsInfoReducer.orgDetailsReducer.mission,
                message: this.props.orgsInfoReducer.orgDetailsReducer.message,
            },
            mode: true,
        })
    }

    switchBack = () => {
        this.props.dispatch({type: 'UPDATE_ORG', payload: {id: this.props.orgsInfoReducer.orgDetailsReducer.id, ...this.state.orgInfo}})
        this.setState({
            mode: false,
        })
    }

    render() {
        return (
            <>
                {!this.state.mode &&
                    <div className="org-profile-container">
                        <img className="profile-pic" src={this.props.user.profile_pic} alt="" />
                        <h1 className="profile-username">{this.props.orgsInfoReducer.orgDetailsReducer.name}</h1>
                        <h4>{this.props.orgsInfoReducer.orgDetailsReducer.type}</h4>
                        <h4>{this.props.orgsInfoReducer.orgDetailsReducer.address}</h4>
                        <h3>Events:</h3>
                        <div className="profile-buttons-container">
                            <Button className="profile-button" variant="contained">Create</Button>
                            <Button className="profile-button" variant="contained">Manage</Button>
                        </div>
                        <h4>Intro</h4>
                        <p className="create-org-subheader">{this.props.orgsInfoReducer.orgDetailsReducer.intro}</p>
                        <h4>Mission</h4>
                        <p className="create-org-subheader">{this.props.orgsInfoReducer.orgDetailsReducer.mission}</p>
                        <h4>Message</h4>
                        <p className="create-org-subheader">{this.props.orgsInfoReducer.orgDetailsReducer.message}</p>
                        <h4 className="create-org-subheader">Images</h4>
                        <input className="create-org-input" type="text" placeholder="Image link" />
                        <Button onClick={this.switchToEditMode} className="profile-button edit-button" variant="outlined">Edit</Button>
                        {/* <pre>{JSON.stringify(props.user, null, 2)}</pre> */}
                    </div>
                }
                {this.state.mode &&
                    <div className="org-profile-container">
                        <img className="profile-pic" src={this.props.user.profile_pic} alt="" />
                        <input onChange={(event) => this.handleChange('name', event)} className="org-edit-header" value={this.state.orgInfo.name} />
                        <input onChange={(event) => this.handleChange('type', event)} className="org-edit-subheader" value={this.state.orgInfo.type} />
                        <input onChange={(event) => this.handleChange('address', event)} className="org-edit-subheader" value={this.state.orgInfo.address} />
                        <h3>Events:</h3>
                        <div className="profile-buttons-container">
                            <Button className="profile-button" variant="contained">Create</Button>
                            <Button className="profile-button" variant="contained">Manage</Button>
                        </div>
                        <h4>Intro</h4>
                        <textarea onChange={(event) => this.handleChange('intro', event)} className="org-edit-textarea" value={this.state.orgInfo.intro} />
                        <h4>Mission</h4>
                        <textarea onChange={(event) => this.handleChange('mission', event)} className="org-edit-textarea" value={this.state.orgInfo.mission} />
                        <h4>Message</h4>
                        <textarea onChange={(event) => this.handleChange('message', event)} className="org-edit-textarea" value={this.state.orgInfo.message} />
                        <h4 className="create-org-subheader">Images</h4>
                        <input className="create-org-input" type="text" placeholder="Image link" />
                        <Button onClick={this.switchBack}className="profile-button edit-button" variant="outlined">Save</Button>
                        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
                    </div>
                }
            </>
        )
    }
};

const mapReduxStateToProps = reduxState => {
    return reduxState
}

export default withRouter(connect(mapReduxStateToProps)(OrganizationProfile));
