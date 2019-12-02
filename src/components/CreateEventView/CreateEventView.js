import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateEventView.css';

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

class CreateEventView extends Component {
    state = {
        event: {
            org_id: this.props.match.params.id,
            name: '',
            description: '',
            start: new Date(),
            end: new Date(),
            address: '',
            req: '',
        },
    }

    handleChange = (propertyName, event) => {
        this.setState({
            event: {
                ...this.state.event,
                [propertyName]: event.target.value
            }
        })
    }

    handleDateChange = (prop, date) => {
        this.setState({
            event: {
                ...this.state.event,
                [prop]: date
            }
        })
    }

    handleClick = () => {
        this.props.dispatch({ type: 'CREATE_EVENT', payload: this.state.event })
        this.props.history.push(`/profile/manage/organization/${this.props.match.params.id}/manage/events`)
    }

    render() {
        return (
            <>
                <ArrowBackIcon onClick={() => this.props.history.push(`/profile/manage/organization/${this.props.match.params.id}`)} viewBox="0 0 36 36" className="back-icon" />
                <h1 className="create-org-header">Create Event</h1>
                <div className="create-org-container">
                    <h4 className="create-org-subheader">Name</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('name', event)} type="text" placeholder="Event name" value={this.state.event.name} />
                    <h4 className="create-org-subheader">Description</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('description', event)} type="text" placeholder="Event description" value={this.state.event.type} />
                    <h4 className="create-org-subheader">Event Address</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('address', event)} type="text" placeholder="Event address" value={this.state.event.address} />
                    <h4 className="create-org-subheader">Start Date/Time</h4>
                    <DatePicker
                        selected={this.state.event.start}
                        onSelect={(date) => this.handleDateChange('start', date)}
                        onChange={(date) => this.handleDateChange('start', date)}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                    <h4 className="create-org-subheader">End Date/Time</h4>
                    <DatePicker
                        selected={this.state.event.end}
                        onSelect={(date) => this.handleDateChange('end', date)}
                        onChange={(date) => this.handleDateChange('end', date)}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                    <h4 className="create-org-subheader">Restrictions/Requirements</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('reqs', event)} type="text" placeholder="Any restrictions or requirements for event" value={this.state.event.mission} />
                </div>
                <button className="create-org-submit" onClick={this.handleClick}>SUBMIT</button>
                {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
            </>
        );
    }
};

const mapReduxStateToProps = reduxState => {
    return reduxState
}

export default withRouter(connect(mapReduxStateToProps)(CreateEventView));
