import React, { useCallback, useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import { LOCATIONS } from 'constants/collections';
import db from 'utils/firebaseFirestore';
import FavoriteCity from 'components/FavoriteCity/FavoriteCity';
import Spinner from 'components/Spinner/Spinner';
import styles from './Favorites.module.css';

const Favorites = props => {
  const { city } = props;

  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [city]);

  useEffect(() => {
    setIsLoading(true);
    getAllFavorites();
  }, [getAllFavorites]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

Favorites.propTypes = {
  city: PropTypes.string.isRequired,
};

export default Favorites;
