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

export default function OrganizationListView() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className="organization-list">
                <List component="nav" aria-label="upcoming events list">
                    <ListItem button>
                        <ListItemText primary="Event Name #1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Event Name #2" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Event Name #1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Event Name #2" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Event Name #1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Event Name #2" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Event Name #1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Event Name #2" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Event Name #1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Event Name #2" />
                    </ListItem>
                </List>
            </div>
        </div>
    );
}