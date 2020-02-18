import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, TextField, InputAdornment, MenuItem } from '@material-ui/core';
import ts from '@mapbox/timespace';

import useHttp from 'hooks/useHttp';
import hereAutosuggestAxios from 'axios/hereAutosuggest';
import SearchIcon from '@material-ui/icons/Search';
import styles from './SearchBox.module.css';

const useStyles = makeStyles(() => ({
  searchRoot: {
    backgroundColor: '#FFFFFF',
    borderRadius: '6px',
    fontSize: '1.1em',
  },
}));

const SearchBox = props => {
  const { placeholder, className, locationData, addFavorite, addFavoriteLocally, isLoggedIn } = props;

  const hereAutosuggestHttp = useHttp();
  const { sendRequest: sendRequestHereAutosuggest } = hereAutosuggestHttp;

  const [location, setLocation] = useState({});
  const [searchString, setSearchString] = useState('');
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);

  const classes = useStyles();

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
      const city = value.title.split(' ');
      const favorite = {
        city: city[0],
        country: country.length > 1 ? country[country.length - 1] : country[0],
        latitude: value.position[1],
        longitude: value.position[0],
        utcOffset: time.utcOffset(),
        dateTime: new Date(),
      };
      if (isLoggedIn) {
        addFavorite(favorite);
      } else {
        addFavoriteLocally(favorite);
      }
    },
    [addFavorite, addFavoriteLocally, isLoggedIn],
  );

  return (
    <div className={className}>
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
  locationData: PropTypes.objectOf(PropTypes.any).isRequired,
  addFavorite: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  addFavoriteLocally: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
  placeholder: '',
  className: '',
};

export default SearchBox;
