import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EventDetails.css'

class EventDetails extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_ORG_DETAILS', payload: this.props.match.params.id })
        this.props.dispatch({ type: 'GET_EVENT_DETAILS', payload: this.props.match.params.event_id })
    }

    render() {
        return (
            <>
                <h1 className="event-details-org-header">{this.props.orgsInfoReducer.orgDetailsReducer.name}</h1>
                <div className="event_details-container">
                    <h1>{this.props.eventsRootReducer.eventDetailsReducer.name}</h1>
                    <p>{this.props.eventsRootReducer.eventDetailsReducer.event_description}</p>
                    <p>{this.props.eventsRootReducer.eventDetailsReducer.event_start}</p>
                    <p>{this.props.eventsRootReducer.eventDetailsReducer.event_end}</p>
                    <p>{this.props.eventsRootReducer.eventDetailsReducer.reqs}</p>
                    <h2>Volunteers Signed Up</h2>
                    {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
                </div>
            </>
        )
    }
};

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(EventDetails);
