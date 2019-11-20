import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

function DetailsNavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction disableRipple label="Details" icon={<DetailsIcon />} />
      <BottomNavigationAction disableRipple label="Events" icon={<EventAvailableIcon />} />
      <BottomNavigationAction disableRipple label="Location" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
}

export default DetailsNavBar;