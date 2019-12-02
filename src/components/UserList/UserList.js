import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';
import dateFormat from 'dateformat';

import './UserList.css'

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
                            <div className="user-list-item">
                                <ListItem dense={true} disableGutters={true} key={i}>
                                    <ListItemText primaryTypographyProps={{ variant: 'h6' }} primary={item.name} />
                                    <ListItemText secondary={item.email} />
                                </ListItem>
                            </div>
                        ) :
                        <ListItem key={0}>
                            <ListItemText primary={'No users have signed up yet'} />
                        </ListItem>
                    }
                </List>
                {/* {JSON.stringify(props.listItems, null, 2)} */}
            </div>
        </div>
    );
}