import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';
import dateFormat from 'dateformat';

import './EventList.css'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function OrganizationListView(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className="organization-list-rework" style={props.style}>
                <List component="nav" aria-label="upcoming events list">
                    {props.listItems.length > 0 ?
                        props.listItems.map((item, i) =>
                            <ListItem dense={true} disableGutters={true} key={i}>
                                <ListItemText primaryTypographyProps={{variant: 'h6'}} primary={item.name} />
                                {dateFormat(item.event_start) === dateFormat(item.event_end) ?
                                    <ListItemText secondary={dateFormat(item.event_start, 'dddd, mmmm dS')} /> :
                                    <ListItemText secondary={`${dateFormat(item.event_start, 'dddd, mmm dS')} - ${dateFormat(item.event_end, 'dddd, mmm dS')}`} />
                                }
                                {/* <ListItemText secondary={dateFormat(Date(item.event_start), 'fullDate')} /> */}
                                <p className="spacer"></p>
                                <ListItemText primaryTypographyProps={{variant: 'body1'}} primary={item.event_description} />
                                <Button onClick={() => props.handleClick(item.id)} className="learn-more-button">LEARN MORE</Button>
                            </ListItem>
                        ) :
                        <ListItem key={0}>
                                <ListItemText primary={'Nothing here yet :('} />
                            </ListItem>
                    }
                </List>
                {/* {JSON.stringify(props.listItems, null, 2)} */}
            </div>
        </div>
    );
}