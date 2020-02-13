import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, TextField, InputAdornment, MenuItem } from '@material-ui/core';
import ts from '@mapbox/timespace';

import useHttp from 'hooks/useHttp';
import hereAutosuggestAxios from 'axios/hereAutosuggest';
import { LOCATIONS } from 'constants/collections';
import db from 'utils/firebaseFirestore';
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
  const { placeholder, className, ipStackHttp } = props;

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

  const saveLocation = useCallback(
    async data => {
      const locationRef = db.collection(LOCATIONS);
      try {
        const response = await locationRef.where('city', '==', data.city).get();
        if (response.empty) {
          locationRef.add({
            ...data,
            dateTime: new Date(),
          });
          setNotification('Successfully added to favorites!', 'info');
        } else {
          setNotification('City already exists!', 'warning');
        }
      } catch (error) {
        setNotification('Error saving the city...', 'error');
      }
    },
    [setNotification],
  );

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
    if (ipStackHttp.data) {
      setLocation({
        latitude: ipStackHttp.data.latitude,
        longitude: ipStackHttp.data.longitude,
      });
    }
  }, [ipStackHttp.data]);

  const onChange = useCallback(event => {
    setSearchString(event.target.value);
  }, []);

  const onClickMenuItem = useCallback(
    value => {
      const timestamp = Date.now();
      const time = ts.getFuzzyLocalTimeFromPoint(timestamp, value.position.reverse());
      const country = value.vicinity.split('<br/>');
      saveLocation({
        city: value.title,
        country: country.length > 1 ? country[country.length - 1] : country[0],
        latitude: value.position[1],
        longitude: value.position[0],
        utcOffset: time.utcOffset(),
      });
    },
    [saveLocation],
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
  placeholder: PropTypes.string,
  className: PropTypes.string,
  ipStackHttp: PropTypes.objectOf(PropTypes.any).isRequired,
};

SearchBox.defaultProps = {
  placeholder: '',
  className: '',
};

export default SearchBox;
