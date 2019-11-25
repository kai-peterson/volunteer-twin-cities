import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
        },
        startDate: new Date(),
        endDate: new Date()
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
        // if (prop === 'start') {
        //     this.setState({
        //         startDate: date
        //     })
        // }
        // else if (prop === 'end') {
        //     this.setState({
        //         endDate: date
        //     })
        // }
        this.setState({
            [prop]: date
        })
    }

    handleClick = () => {
        this.props.dispatch({ type: 'CREATE_EVENT', payload: this.state.event })
        this.props.history.push(`/profile/manage/organization/${this.props.match.params.id}/manage/events`)
    }

    render() {
        return (
            <>
                <h1 className="create-org-header">Create Event</h1>
                <div className="create-org-container">
                    <h4 className="create-org-subheader">Name</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('name', event)} type="text" placeholder="Event name" value={this.state.event.name} />
                    <h4 className="create-org-subheader">Description</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('description', event)} type="text" placeholder="Event description" value={this.state.event.type} />
                    <h4 className="create-org-subheader">Start Date/Time</h4>
                    <DatePicker
                        selected={this.state.startDate}
                        // onSelect={this.handleDateChange}
                        onChange={(date) => this.handleDateChange('startDate', date)}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                    <h4 className="create-org-subheader">End Date/Time</h4>
                    <DatePicker
                        selected={this.state.endDate}
                        // onSelect={this.handleDateChange}
                        onChange={(date) => this.handleDateChange('endDate', date)}
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
