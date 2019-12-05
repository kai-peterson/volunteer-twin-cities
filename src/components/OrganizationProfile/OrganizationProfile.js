import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import './OrganizationProfile.css'

import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ImageUploadS3 from '../ImageUploadS3/ImageUploadS3';

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
        image: '',
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

    handleClick = () => {
        this.props.history.push(`/profile/manage/organization/${this.props.match.params.id}/create/event`)
    }

    handleImageChange = (event) => {
        this.setState({
            image: event.target.value
        })
    }

    handleImageUpload = (url) => {
        this.setState({
            image: url
        })
        this.props.dispatch({ type: 'ADD_ORG_IMAGE', payload: { id: this.props.match.params.id, image: url } })
    }

    handleImageClick = () => {
        this.props.dispatch({ type: 'ADD_ORG_IMAGE', payload: { id: this.props.match.params.id, image: this.state.image } })
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
        this.props.dispatch({ type: 'UPDATE_ORG', payload: { id: this.props.orgsInfoReducer.orgDetailsReducer.id, ...this.state.orgInfo } })
        this.setState({
            mode: false,
        })
    }

    render() {
        return (
            <>
                <ArrowBackIcon onClick={() => this.props.history.push('/profile/manage')} viewBox="0 0 48 48" className="back-icon" />
                {!this.state.mode &&
                    <div className="org-profile-container">
                        <img className="profile-pic" src={this.props.user.profile_pic} alt="" />
                        <h2 className="profile-username">{this.props.orgsInfoReducer.orgDetailsReducer.name}</h2>
                        <div className="events-container">
                            <h3>Events</h3>
                            <div className="profile-buttons-container">
                                <Button onClick={() => this.props.history.push(`/profile/manage/organization/${this.props.match.params.id}/create/event`)} className="profile-button" variant="contained">Create</Button>
                                <Button onClick={() => this.props.history.push(`/profile/manage/organization/${this.props.match.params.id}/manage/events`)} className="profile-button" variant="contained">Manage</Button>
                            </div>
                        </div>
                        {/* <div className="upload-image-container">
                            <input onChange={this.handleImageChange} value={this.state.image} className="upload-image-input" type="text" placeholder="Image link" />
                            <Button onClick={this.handleImageClick} variant="outlined" size="small" className="upload-image-button">Add Image</Button>
                        </div> */}
                        {/* <Button onClick={this.handleImageClick} variant="outlined" size="small" className="upload-image-button">Add Image</Button> */}
                        <h4 className="org-profile-subheader">Type</h4>
                        <p className="orange-line"></p>
                        <p>{this.props.orgsInfoReducer.orgDetailsReducer.type}</p>
                        <h4 className="org-profile-subheader">Address</h4>
                        <p className="orange-line"></p>
                        <p>{this.props.orgsInfoReducer.orgDetailsReducer.address}</p>
                        <h4 className="org-profile-subheader">Intro</h4>
                        <p className="orange-line"></p>
                        <p className="create-org-subheader">{this.props.orgsInfoReducer.orgDetailsReducer.intro}</p>
                        <h4 className="org-profile-subheader">Mission</h4>
                        <p className="orange-line"></p>
                        <p className="create-org-subheader">{this.props.orgsInfoReducer.orgDetailsReducer.mission}</p>
                        <h4 className="org-profile-subheader">Message</h4>
                        <p className="orange-line"></p>
                        <p className="create-org-subheader">{this.props.orgsInfoReducer.orgDetailsReducer.message}</p>
                        <h4 className="org-profile-subheader">Carousel Images</h4>
                        <p className="orange-line"></p>
                        <ImageUploadS3 handleImageChange={this.handleImageUpload} />
                        {/* <h4 className="create-org-subheader">Add image</h4> */}
                        <Button onClick={this.switchToEditMode} className="profile-button edit-button" variant="outlined">Edit</Button>
                        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
                    </div>
                }
                {this.state.mode &&
                    <div className="org-profile-container">
                        <img className="profile-pic" src={this.props.user.profile_pic} alt="" />
                        <input onChange={(event) => this.handleChange('name', event)} className="org-edit-header" value={this.state.orgInfo.name} />
                        {/* <div className="upload-image-container">
                            <input onChange={this.handleImageChange} value={this.state.image} className="upload-image-input" type="text" placeholder="Image link" />
                            <Button onClick={this.handleImageClick} variant="outlined" size="small" className="upload-image-button">Add Image</Button>
                        </div> */}
                        <h4 className="org-profile-subheader">Type</h4>
                        <p className="orange-line"></p>
                        <input onChange={(event) => this.handleChange('type', event)} className="org-edit-subheader" value={this.state.orgInfo.type} />
                        <h4 className="org-profile-subheader">Address</h4>
                        <p className="orange-line"></p>
                        <input onChange={(event) => this.handleChange('address', event)} className="org-edit-subheader" value={this.state.orgInfo.address} />
                        {/* <h3>Events:</h3>
                        <div className="profile-buttons-container">
                            <Button className="profile-button" variant="contained">Create</Button>
                            <Button className="profile-button" variant="contained">Manage</Button>
                        </div> */}
                        <h4 className="org-profile-subheader">Intro</h4>
                        <p className="orange-line"></p>
                        <TextareaAutosize onChange={(event) => this.handleChange('intro', event)} className="org-edit-textarea" value={this.state.orgInfo.intro} />
                        <h4 className="org-profile-subheader">Mission</h4>
                        <p className="orange-line"></p>
                        <TextareaAutosize onChange={(event) => this.handleChange('mission', event)} className="org-edit-textarea" value={this.state.orgInfo.mission} />
                        <h4 className="org-profile-subheader">Message</h4>
                        <p className="orange-line"></p>
                        <TextareaAutosize onChange={(event) => this.handleChange('message', event)} className="org-edit-textarea" value={this.state.orgInfo.message} />
                        <div className="cancel-save-button-container">
                            <Button onClick={() => this.setState({ mode: !this.state.mode })} className="profile-button edit-button" variant="outlined">Cancel</Button>
                            <Button onClick={this.switchBack} className="profile-button edit-button" variant="outlined">Save</Button>
                        </div>
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
