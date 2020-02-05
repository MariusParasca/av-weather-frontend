import React from 'react';
import PropTypes from 'prop-types';

import FavoriteCity from 'components/FavoriteCity/FavoriteCity';
import styles from './Favorites.module.css';

const Favorites = props => {
  return (
    <div className={styles.container}>
      <FavoriteCity time="22:32" location="IASI, ROMANIA" degreeValue={-2} />
      <FavoriteCity time="22:32" location="IASI, ROMANIA" degreeValue={-2} />
      <FavoriteCity time="22:32" location="IASI, ROMANIA" degreeValue={-2} />
      <FavoriteCity time="22:32" location="IASI, ROMANIA" degreeValue={-2} />
    </div>
  );
};

Favorites.propTypes = {};

export default Favorites;
