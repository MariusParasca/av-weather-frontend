import React from 'react';
// import PropTypes from 'prop-types';

import FavoriteCity from 'components/FavoriteCity/FavoriteCity';
import styles from './Favorites.module.css';

const Favorites = () => {
  return (
    <div className={styles.container}>
      <FavoriteCity utcOffset={-480} city="Los Angeles" country="America" degreeValue={-2} />
      <FavoriteCity city="Iasi" country="Romania" degreeValue={-2} />
      <FavoriteCity city="IASI" country="Romania" degreeValue={-2} />
    </div>
  );
};

Favorites.propTypes = {};

export default Favorites;
