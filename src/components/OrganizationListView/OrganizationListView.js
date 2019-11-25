import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import './OrganizationListView.css'

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
            <div className="organization-list" style={props.style}>
                <List component="nav" aria-label="upcoming events list">
                    {props.listItems.length > 0 ?
                        props.listItems.map((item, i) =>
                            <ListItem key={i} button onClick={() => props.handleClick(item.id)}>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        ) :
                        <ListItem key={0}>
                                <ListItemText primary={'Nothing here yet :('} />
                            </ListItem>
                    }
                </List>
            </div>
        </div>
    );
}