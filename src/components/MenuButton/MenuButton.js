import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import styles from './MenuButton.module.css';

const MenuButton = props => {
  const { children, path, exact } = props;

  return (
    <NavLink className={styles.navLink} exact={exact} to={path} activeClassName={styles.activeClass}>
      <Button fullWidth>{children}</Button>
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
