import React, { useCallback, useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import { LOCATIONS } from 'constants/collections';
import db from 'utils/firebaseFirestore';
import FavoriteCity from 'components/FavoriteCity/FavoriteCity';
import Spinner from 'components/Spinner/Spinner';
import Notification from 'components/Notification/Notification';
import styles from './Favorites.module.css';

const Favorites = props => {
  const { city } = props;

  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [notificationColor, setNotificationColor] = useState('');

  const setNotification = useCallback((text, color) => {
    setNotificationText(text);
    setNotificationColor(color);
    setIsNotificationOpen(true);
  }, []);

  const getAllFavorites = useCallback(async () => {
    try {
      if (city) {
        const dbFavorites = await db.collection(LOCATIONS).get();
        const docs = [];
        for (const doc of dbFavorites.docs) {
          const data = doc.data();
          if (data.city !== city) {
            docs.push({ ...data, id: doc.id });
          }
        }
        setFavorites(docs);
        setIsLoading(false);
      }
    } catch (error) {
      setNotification('Error getting the data', 'error');
    }
  }, [city, setNotification]);

  const deleteFavorite = useCallback(
    id => {
      try {
        db.collection(LOCATIONS)
          .doc(id)
          .delete();
        setFavorites(favorites.filter(favorite => favorite.id !== id));
        setNotification('Successfully deleted', 'success');
      } catch (error) {
        setNotification('Error deleting the item', 'error');
      }
    },
    [favorites, setNotification],
  );

  useEffect(() => {
    setIsLoading(true);
    getAllFavorites();
  }, [getAllFavorites]);

  return (
    <div className={styles.container}>
      <Notification
        isOpen={isNotificationOpen}
        handleClose={() => setIsNotificationOpen(false)}
        text={notificationText}
        color={notificationColor}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {favorites.map(favorite => (
            <FavoriteCity
              key={favorite.city}
              utcOffset={favorite.utcOffset}
              city={favorite.city}
              country={favorite.country}
              degreeValue={-2}
              onClickIcon={() => deleteFavorite(favorite.id)}
            />
          ))}
          {favorites.length === 0 && <Typography variant="h2">No favorite places</Typography>}
        </>
      )}
    </div>
  );
};

Favorites.propTypes = {
  city: PropTypes.string.isRequired,
};

export default Favorites;
