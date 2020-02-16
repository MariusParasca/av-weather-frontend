import React from 'react';
import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import PinDropIcon from '@material-ui/icons/PinDrop';
import MapIcon from '@material-ui/icons/Map';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import RestoreIcon from '@material-ui/icons/Restore';
import SettingsIcon from '@material-ui/icons/Settings';

import { LEFT_DRAWER_WIDTH } from 'constants/constants';
import { PageRoute, ChartsRoute } from 'utils/routes';
import MenuButton from 'components/MenuButton/MenuButton';
import { NavLink } from 'react-router-dom';
import styles from './ApplicationBar.module.css';

const useStyles = makeStyles(theme => ({
  paper: { width: LEFT_DRAWER_WIDTH },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: LEFT_DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: '26px 26px 47px 26px',
  },
}));

const ApplicationBar = () => {
  const classes = useStyles();
  return (
    <nav className={classes.drawer}>
      <Drawer classes={{ paper: classes.paper }} variant="permanent">
        <NavLink to={PageRoute.account}>
          <Avatar className={classes.small} />
        </NavLink>
        <div className={styles.mainOptionsContainer}>
          <MenuButton exact path={PageRoute.home}>
            <PinDropIcon />
          </MenuButton>
          <MenuButton path={PageRoute.map}>
            <MapIcon />
          </MenuButton>
          <MenuButton path={`${PageRoute.charts}${ChartsRoute.temperature}`}>
            <ShowChartIcon />
          </MenuButton>
          <MenuButton path={PageRoute.favorites}>
            <StarBorderIcon />
          </MenuButton>
          <MenuButton path={PageRoute.history}>
            <RestoreIcon />
          </MenuButton>
        </div>
        <div className={styles.settingsContainer}>
          <Button fullWidth>
            <SettingsIcon />
          </Button>
        </div>
      </Drawer>
    </nav>
  );
};

export default ApplicationBar;
