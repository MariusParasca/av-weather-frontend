import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, TextField, InputAdornment, MenuItem } from '@material-ui/core';
import ts from '@mapbox/timespace';

import useHttp from 'hooks/useHttp';
import hereAutosuggestAxios from 'axios/hereAutosuggest';
import SearchIcon from '@material-ui/icons/Search';
import Notification from 'components/Notification/Notification';
import styles from './SearchBox.module.css';

const useStyles = makeStyles(() => ({
  searchRoot: {
    backgroundColor: '#FFFFFF',
    borderRadius: '6px',
    fontSize: '1.1em',
  },
}));

const SearchBox = props => {
  const { placeholder, className, locationData, addFavorite, favorites } = props;

  const hereAutosuggestHttp = useHttp();
  const { sendRequest: sendRequestHereAutosuggest } = hereAutosuggestHttp;

  const [location, setLocation] = useState({});
  const [searchString, setSearchString] = useState('');
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [notificationColor, setNotificationColor] = useState('');

  const classes = useStyles();

  const setNotification = useCallback((text, color) => {
    setNotificationText(text);
    setNotificationColor(color);
    setIsNotificationOpen(true);
  }, []);

  useEffect(() => {
    console.log(favorites);
    if (favorites.error) {
      setNotification(favorites.error.message, 'error');
    } else if (favorites.message) {
      setNotification(favorites.message, favorites.messageType);
    }
  }, [favorites, favorites.error, favorites.message, favorites.messageType, setNotification]);

  const onBlur = useCallback(() => {
    // TO DO
    setAutoCompleteOptions([]);
    setSearchString('');
  }, []);

  useEffect(() => {
    const regex = new RegExp('City|Town|Village', 'i');
    if (hereAutosuggestHttp.data)
      setAutoCompleteOptions(hereAutosuggestHttp.data.results.filter(result => regex.test(result.categoryTitle)));
  }, [hereAutosuggestHttp.data]);

  useEffect(() => {
    let intervalId;
    if (searchString && location.latitude) {
      intervalId = setTimeout(() => {
        sendRequestHereAutosuggest(
          hereAutosuggestAxios,
          [
            '',
            { params: { at: `${location.latitude},${location.longitude}`, q: searchString, result_types: 'address' } },
          ],
          'get',
        );
      }, 200);
    }

    return () => {
      clearTimeout(intervalId);
    };
  }, [location, searchString, sendRequestHereAutosuggest]);

  useEffect(() => {
    if (locationData) {
      setLocation({
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      });
    }
  }, [locationData]);

  const onChange = useCallback(event => {
    setSearchString(event.target.value);
  }, []);

  const onClickMenuItem = useCallback(
    value => {
      const timestamp = Date.now();
      const time = ts.getFuzzyLocalTimeFromPoint(timestamp, value.position.reverse());
      const country = value.vicinity.split('<br/>');
      addFavorite({
        city: value.title,
        country: country.length > 1 ? country[country.length - 1] : country[0],
        latitude: value.position[1],
        longitude: value.position[0],
        utcOffset: time.utcOffset(),
      });
    },
    [addFavorite],
  );

  return (
    <div className={className}>
      <Notification
        isOpen={isNotificationOpen}
        handleClose={() => setIsNotificationOpen(false)}
        text={notificationText}
        color={notificationColor}
      />
      <TextField
        variant="outlined"
        margin="none"
        placeholder={placeholder}
        // onBlur={onBlur}
        fullWidth
        value={searchString}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          classes: { root: classes.searchRoot },
        }}
      />
      {autoCompleteOptions.length > 0 && (
        <div className={styles.autoCompleteContainer}>
          {autoCompleteOptions.map((el, index) => (
            <MenuItem key={`${el.title}${index}`} onClick={() => onClickMenuItem(el)}>
              {el.title}
            </MenuItem>
          ))}
        </div>
      )}
    </div>
  );
};

SearchBox.propTypes = {
  favorites: PropTypes.objectOf(PropTypes.any).isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  locationData: PropTypes.objectOf(PropTypes.any).isRequired,
  addFavorite: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
  placeholder: '',
  className: '',
};

export default SearchBox;
