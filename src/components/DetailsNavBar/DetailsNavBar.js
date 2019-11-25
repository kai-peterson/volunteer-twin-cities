import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DetailsIcon from '@material-ui/icons/Details';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

function DetailsNavBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        props.dispatch({type: 'SET_NAV', payload: newValue})
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction value={0} disableRipple label="Details" icon={<DetailsIcon />} />
      <BottomNavigationAction value={1} disableRipple label="Events" icon={<EventAvailableIcon />} />
      <BottomNavigationAction value={2} disableRipple label="Location" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
}

export default connect()(DetailsNavBar);