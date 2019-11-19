import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';

import './DrawerNav.css'

const useStyles = makeStyles({
    list: {
        width: 250,
        overflow: 'hidden',
    },
    fullList: {
        width: 'auto',
    },
});

function DrawerNav(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List className="list-container">
                <ListItem>
                    <Link to="/home">
                        <ListItemIcon><img className="list-item" src="images/home-icon.svg" alt="home button icon" /></ListItemIcon>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/profile">
                        <ListItemIcon><img className="list-item" src="images/profpic.jpg" alt="profile button icon" /></ListItemIcon>
                    </Link>
                </ListItem>
                <div className="logout-container">
                <ListItem>
                    <ListItemIcon className="logout-button" onClick={() => props.dispatch({ type: 'LOGOUT' })}><img className="list-item" src="images/log-out-icon.png" alt="log out icon" /></ListItemIcon>
                </ListItem>
                </div>
            </List>
        </div>
    );
    
    return (
        <span className="burger-menu-container">
            <span className="burger-icon-container" >
                <Button onClick={toggleDrawer('right', true)}><img className="burger-icon" src="images/burger-menu-icon.png" alt="burger drawer icon" /></Button>
            </span>
            <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
                {sideList('right')}
            </Drawer>
        </span>
    );
}

export default connect()(DrawerNav);