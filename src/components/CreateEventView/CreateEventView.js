import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './CreateEventView.css';

class CreateEventView extends Component {
    state = {
        event: {
            org_id: this.props.match.params.id,
            name: '',
            description: '',
            start: '',
            end: '',
            req: '',
        }
    }

    handleChange = (propertyName, event) => {
        this.setState({
            event: {
                ...this.state.event,
                [propertyName]: event.target.value
            }
        })
    }

    handleClick = () => {
        this.props.dispatch({type: 'CREATE_EVENT', payload: this.state.event})
        this.props.history.push(`/profile/manage/organization/${this.props.match.params.id}/manage/events`)
    }

    render() {
        return (
            <>
                <h1 className="create-org-header">Create Event</h1>
                <div className="create-org-container">
                    <h4 className="create-org-subheader">Name</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('name', event)} type="text" placeholder="Event name" value={this.state.event.name}/>
                    <h4 className="create-org-subheader">Description</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('description', event)} type="text" placeholder="Event description" value={this.state.event.type}/>
                    <h4 className="create-org-subheader">Start Date/Time</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('start', event)} type="text" placeholder="(i.e. 11/20/2019 - 3:00pm)" value={this.state.event.address}/>
                    <h4 className="create-org-subheader">End Date/Time</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('end', event)} type="text" placeholder="(i.e. 11/20/2019 - 8:00pm)" value={this.state.event.intro}/>
                    <h4 className="create-org-subheader">Restrictions/Requirements</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('reqs', event)} type="text" placeholder="Any restrictions or requirements for event" value={this.state.event.mission}/>
                </div>
                <button className="create-org-submit" onClick={this.handleClick}>SUBMIT</button>
                {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
            </>
        );
    }
};

const mapReduxStateToProps = reduxState => {
    return reduxState
}

export default withRouter(connect(mapReduxStateToProps)(CreateEventView));
