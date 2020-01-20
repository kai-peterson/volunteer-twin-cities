import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateEventView.css';

import Swal from 'sweetalert2';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '@material-ui/core'
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

    handlePresentation = () => {
        this.setState({
            event: {
                ...this.state.event,
                name: 'Info Session',
                description: 'Learn more about what is means to be a Big Brother or Big Sister and how you can positively impact childrens lives',
                address: '2550 University Ave W, St Paul MN, 55114',
                req: 'None'
            }
        })
    }

    handleClick = () => {
        this.props.dispatch({ type: 'CREATE_EVENT', payload: this.state.event })
        Swal.fire('Event Created!<br/><br/>You will receive an automated email 24 hours before the event begins with a list of volunteers who have signed up')
        this.props.history.push(`/profile/manage/organization/${this.props.match.params.id}/manage/events`)
    }

    render() {
        return (
            <>
                <ArrowBackIcon onClick={() => this.props.history.push(`/profile/manage/organization/${this.props.match.params.id}`)} viewBox="0 0 48 48" className="back-icon" />
                <div className="create-org-container">
                    <h1 onClick={this.handlePresentation} style={{ marginBottom: '-5px', marginTop: '0', marginLeft: '-20px', textAlign: 'center' }} className="create-org-header">Create Event</h1>
                    <h4 style={{ marginTop: '30px' }} className="create-org-subheader">Name</h4>
                    <input className="create-org-input" onChange={(event) => this.handleChange('name', event)} type="text" placeholder="Event name" value={this.state.event.name} />
                    <h4 className="create-org-subheader">Description</h4>
                    <TextareaAutosize className="create-org-textarea" onChange={(event) => this.handleChange('description', event)} type="text" placeholder="Event description" value={this.state.event.description} />
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
                    <input className="create-org-input" onChange={(event) => this.handleChange('reqs', event)} type="text" placeholder="Any restrictions or requirements for event" value={this.state.event.req} />
                    <Button style={{ margin: '25px auto 0 auto', backgroundColor: '#eaa44b', color: 'white', border: '1px solid #eaa44b' }} className="create-org-submit profile-button" onClick={this.handleClick} variant="contained">SUBMIT</Button>
                </div>
                {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
            </>
        );
    }
};

const mapReduxStateToProps = reduxState => {
    return reduxState
}

export default withRouter(connect(mapReduxStateToProps)(CreateEventView));
