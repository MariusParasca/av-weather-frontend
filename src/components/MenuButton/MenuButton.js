import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import styles from './MenuButton.module.css';

const useStyles = makeStyles(() => ({
  buttonRoot: {
    '&': {
      borderRadius: 0,
    },
    '&:hover': {
      background: '#6C66FA',
    },
  },
}));

const MenuButton = props => {
  const { children, path, exact } = props;

  const classes = useStyles();

  return (
    <NavLink className={styles.navLink} exact={exact} to={path} activeClassName={styles.activeClass}>
      <Button classes={{ root: classes.buttonRoot }} fullWidth>
        {children}
      </Button>
    </NavLink>
  );
};

MenuButton.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
};

MenuButton.defaultProps = {
  path: '/',
  exact: false,
};

export default MenuButton;
