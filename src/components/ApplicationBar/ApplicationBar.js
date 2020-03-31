import React from 'react';
import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import { ReactComponent as LocationSvg } from 'svgs/Appbar/location.svg';
import { ReactComponent as GraphSvg } from 'svgs/Appbar/graph.svg';
import { ReactComponent as HistorySvg } from 'svgs/Appbar/history.svg';
import { ReactComponent as MapSvg } from 'svgs/Appbar/map.svg';
import { ReactComponent as SettingsSvg } from 'svgs/Appbar/settings.svg';
import { ReactComponent as StarSvg } from 'svgs/Appbar/star.svg';
import { LEFT_DRAWER_WIDTH } from 'constants/constants';
import { PageRoute, ChartsRoute, MapsRoute } from 'utils/routes';
import MenuButton from 'components/MenuButton/MenuButton';
import { NavLink } from 'react-router-dom';
import WithSvg from 'components/WithSvg/WithSvg';
import styles from './ApplicationBar.module.css';

const useStyles = makeStyles(theme => ({
  paper: { width: LEFT_DRAWER_WIDTH, background: '#131231' },
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
            <WithSvg component={LocationSvg} size={22} />
          </MenuButton>
          <MenuButton path={`${PageRoute.map}${MapsRoute.cloudCover}`}>
            <WithSvg component={MapSvg} size={20} />
          </MenuButton>
          <MenuButton path={`${PageRoute.charts}${ChartsRoute.temperature}`}>
            <WithSvg component={GraphSvg} size={20} />
          </MenuButton>
          <MenuButton path={PageRoute.favorites}>
            <WithSvg component={StarSvg} size={20} />
          </MenuButton>
          <MenuButton path={PageRoute.history}>
            <WithSvg component={HistorySvg} size={20} />
          </MenuButton>
        </div>
        <div className={styles.settingsContainer}>
          <MenuButton exact path={PageRoute.home}>
            <WithSvg component={SettingsSvg} size={20} />
          </MenuButton>
        </div>
      </Drawer>
    </nav>
  );
};

export default ApplicationBar;
