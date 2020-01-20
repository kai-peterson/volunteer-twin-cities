import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CreateOrgView.css';

import Swal from 'sweetalert2';
import { Button } from '@material-ui/core';
import TextareaAutosize from 'react-textarea-autosize'

import ImageUploadS3 from '../ImageUploadS3/ImageUploadS3';

class CreateOrgView extends Component {
    state = {
        organization: {
            name: '',
            type: '',
            address: '',
            intro: '',
            mission: '',
            message: '',
            image: '',
        }
    }

    handleChange = (propertyName, event) => {
        this.setState({
            organization: {
                ...this.state.organization,
                [propertyName]: event.target.value
            }
        })
    }

    handleImageChange = (url) => {
        this.setState({
            organization: {
                ...this.state.organization,
                image: url
            }
        })
    }

    handleClick = (orgObject) => {
        this.props.dispatch({ type: 'CREATE_PENDING_ORG', payload: orgObject })
        Swal.fire('Organization Submitted!<br/><br/>An admin will approve or deny your request within 24 hours')
        this.props.history.push('/profile/manage')
    }

    handlePresentation = () => {
        this.setState({
            organization: {
                name: 'Big Brothers Big Sisters Twin Cities',
                type: 'Nonprofit',
                address: '2550 University Ave W, St Paul MN, 55114',
                intro: 'Time to make a big difference. Time to ignite the power and promise of Twin Cities youth. We need passionate people like you.',
                mission: 'Create and support mentoring relationships that ignite the power and promise of youth.',
                message: ' We use evidence-based criteria to make and support safe, life-changing matches that protect the physical and emotional well-being of our Littles. We put safety first, always ensuring we have systems, processes and personnel in place to properly support program participants and staff.',
                image: '',
            }
        })
    }

    render() {
        return (
            <>
                <div className="create-org-container">
                    <h1 onClick={this.handlePresentation} style={{ marginBottom: '5px', marginTop: '0' }} className="create-org-header">Create Organization</h1>
                    <h4 className="create-org-subheader">Name</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('name', event)} type="text" placeholder="Organization Name" value={this.state.organization.name} />
                    <h4 className="create-org-subheader">Type</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('type', event)} type="text" placeholder="(i.e. Non-profit, community, school)" value={this.state.organization.type} />
                    <h4 className="create-org-subheader">Address</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('address', event)} type="text" placeholder="Address" value={this.state.organization.address} />
                    <h4 className="create-org-subheader">Intro</h4>
                    <TextareaAutosize className="create-org-textarea" onChange={(event) => this.handleChange('intro', event)} type="text" placeholder="Short intro to the organization (one to two sentences)" value={this.state.organization.intro} />
                    <h4 className="create-org-subheader">Mission Statement</h4>
                    <TextareaAutosize className="create-org-textarea" onChange={(event) => this.handleChange('mission', event)} type="text" placeholder="Mission Statement" value={this.state.organization.mission} />
                    <h4 className="create-org-subheader">Message to Volunteers</h4>
                    <TextareaAutosize className="create-org-textarea" onChange={(event) => this.handleChange('message', event)} type="text" placeholder="Message to volunteers (what can they expect)" value={this.state.organization.message} />
                    <h4 className="create-org-subheader">Image</h4>
                    <ImageUploadS3 handleImageChange={this.handleImageChange} />
                    <Button style={{ margin: '20px auto', color: '#eaa44b', maxWidth: '20vw' }} className="profile-button" onClick={() => this.handleClick(this.state.organization)} variant="outlined">SUBMIT</Button>
                </div>
                {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
            </>
        );
    }
};

const mapReduxStateToProps = reduxState => {
    return reduxState
}

export default connect(mapReduxStateToProps)(CreateOrgView);
