import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CreateOrgView.css'
import axios from 'axios';

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

    handleClick = (orgObject) => {
        this.props.dispatch({type: 'CREATE_ORG', payload: orgObject})
        this.props.history.push('/profile/manage')
    }

    render() {
        return (
            <>
                <h1 className="create-org-header">Create Organization</h1>
                <div className="create-org-container">
                    <h4 className="create-org-subheader">Name</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('name', event)} type="text" placeholder="Organiation Name" value={this.state.organization.name}/>
                    <h4 className="create-org-subheader">Type</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('type', event)} type="text" placeholder="(i.e. Non-profit, community, school)" value={this.state.organization.type}/>
                    <h4 className="create-org-subheader">Address</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('address', event)} type="text" placeholder="Address" value={this.state.organization.address}/>
                    <h4 className="create-org-subheader">Intro</h4>
                    <textarea className="create-org-input" onChange={(event) => this.handleChange('intro', event)} type="text" placeholder="Short intro introducing the organization" value={this.state.organization.intro}/>
                    <h4 className="create-org-subheader">Mission Statement</h4>
                    <textarea className="create-org-textarea" onChange={(event) => this.handleChange('mission', event)} type="text" placeholder="Mission Statement" value={this.state.organization.mission}/>
                    <h4 className="create-org-subheader">Message to Volunteers</h4>
                    <textarea className="create-org-textarea" onChange={(event) => this.handleChange('message', event)} type="text" placeholder="Message to volunteers (what can they expect)" value={this.state.organization.message}/>
                    <h4 className="create-org-subheader">Images</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('image', event)} type="text" placeholder="Image link" value={this.state.organization.image}/>
                    {/* <button className="create-org-submit" onClick={() => {}}>SUBMIT</button> */}
                </div>
                <button className="create-org-submit" onClick={() => this.handleClick(this.state.organization)}>SUBMIT</button>
                {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
            </>
        );
    }
};

const mapReduxStateToProps = reduxState => {
    return reduxState
}

export default connect(mapReduxStateToProps)(CreateOrgView);
