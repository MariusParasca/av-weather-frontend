import React from 'react';
import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import PinDropIcon from '@material-ui/icons/PinDrop';

import { DRAWER_WIDTH } from 'constants/constants';
import classes from './ApplicationBar.module.css';

const useStyles = makeStyles(theme => ({
  paper: { width: DRAWER_WIDTH },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: '26px',
  },
  firstButton: {
    marginTop: '21px',
  },
}));

const ApplicationBar = () => {
  const styles = useStyles();
  return (
    <nav className={styles.drawer}>
      <Drawer classes={{ paper: styles.paper }} variant="permanent">
        <Avatar className={styles.small} />
        <Button className={styles.firstButton}>
          <PinDropIcon />
        </Button>
      </Drawer>
    </nav>
  );
};

export default ApplicationBar;
