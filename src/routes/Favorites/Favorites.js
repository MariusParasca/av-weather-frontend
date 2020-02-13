import React, { useCallback, useEffect, useState } from 'react';
import { LOCATIONS } from 'constants/collections';
import PropTypes from 'prop-types';

import db from 'utils/firebaseFirestore';
import FavoriteCity from 'components/FavoriteCity/FavoriteCity';
import { Typography } from '@material-ui/core';
import styles from './Favorites.module.css';

const Favorites = props => {
  const { city } = props;
  const [favorites, setFavorites] = useState([]);

  const getAllFavorites = useCallback(async () => {
    try {
      if (city) {
        const dbFavorites = await db.collection(LOCATIONS).get();
        const docs = [];
        for (const doc of dbFavorites.docs) {
          const data = doc.data();
          if (data.city !== city) {
            docs.push(data);
          }
        }
        setFavorites(docs);
      }
    } catch (error) {
      console.log(error);
    }
  }, [city]);

  useEffect(() => {
    getAllFavorites();
  }, [getAllFavorites]);

  return (
    <div className={styles.container}>
      {favorites.length === 0 && <Typography variant="h2">No favorites places</Typography>}
      {favorites.map(favorite => (
        <FavoriteCity
          key={favorite.city}
          utcOffset={favorite.utcOffset}
          city={favorite.city}
          country={favorite.country}
          degreeValue={-2}
        />
      ))}
    </div>
  );
};

Favorites.propTypes = {
  city: PropTypes.string.isRequired,
};

export default Favorites;
