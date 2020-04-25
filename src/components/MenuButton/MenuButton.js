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
  const { children, path, exact, isActive } = props;

  const classes = useStyles();

  return (
    <NavLink
      isActive={isActive}
      className={styles.navLink}
      exact={exact}
      to={path}
      activeClassName={styles.activeClass}
    >
      <Button classes={{ root: classes.buttonRoot }} fullWidth>
        {children}
      </Button>
    </NavLink>
  );
};

MenuButton.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.oneOfType(PropTypes.string, PropTypes.arrayOf(PropTypes.string)),
  exact: PropTypes.bool,
  isActive: PropTypes.func,
};

MenuButton.defaultProps = {
  path: '/',
  exact: false,
  isActive: undefined,
};

export default MenuButton;
