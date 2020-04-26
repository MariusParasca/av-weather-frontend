import React, { useEffect, useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import useHttp from 'hooks/useHttp';
import hereAutosuggestAxios from 'axios/hereAutosuggest';
import SearchIcon from '@material-ui/icons/Search';
import Spinner from 'components/Spinner/Spinner';
import { useDispatch, connect } from 'react-redux';
import { WEATHER_API_SEND } from 'store/actionTypes/weatherAPIActionTypes';
import { getUtcOffsetByCoordinates, updateTextField } from 'utils/helperFunctions';
import styles from './SearchBox.module.css';

const useStyles = makeStyles(() => ({
  searchRoot: {
    '&': {
      backgroundColor: '#2A2951',
      borderRadius: '6px',
      fontSize: '1.1em',
    },
  },
  endAdornment: {
    display: 'none',
  },
  autocompletePaper: {
    margin: '0',
    borderTop: 'none',
    background: '#131231',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  input: {
    padding: '12px 12px 12px 50px !important',
  },
  inputRoot: {
    padding: '0 !important',
    borderRadius: '10px',
  },
  option: {
    '&[data-focus="true"]': {
      backgroundColor: '#3a3966',
    },
  },
}));

const SearchBox = props => {
  const { placeholder, className, locationData } = props;

  const hereAutosuggestHttp = useHttp();
  const { sendRequest: sendRequestHereAutosuggest } = hereAutosuggestHttp;
  const wrapperRef = useRef(null);

  const [location, setLocation] = useState({});
  const [searchString, setSearchString] = useState('');
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const classes = useStyles();

  const disableAutocomplete = useCallback(() => {
    setAutoCompleteOptions([]);
    setSearchString('');
  }, []);

  useEffect(() => {
    const regex = new RegExp('City|Town|Village', 'i');
    if (hereAutosuggestHttp.data) {
      setIsLoading(false);
      setAutoCompleteOptions(hereAutosuggestHttp.data.results.filter(result => regex.test(result.categoryTitle)));
    }
  }, [hereAutosuggestHttp.data]);

  useEffect(() => {
    let intervalId;
    if (searchString && location.latitude) {
      setIsLoading(true);
      intervalId = setTimeout(() => {
        sendRequestHereAutosuggest(
          hereAutosuggestAxios,
          [
            '',
            { params: { at: `${location.latitude},${location.longitude}`, q: searchString, result_types: 'address' } },
          ],
          'get',
        );
      }, 500);
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

  const onClickMenuItem = useCallback(
    value => {
      const country = value.vicinity.split('<br/>');
      const city = value.title.split('(');
      const favorite = {
        city: city[0],
        country: country.length > 1 ? country[country.length - 1] : country[0],
        latitude: value.position[0],
        longitude: value.position[1],
        utcOffset: getUtcOffsetByCoordinates(value.position[0], value.position[1]),
        dateTime: new Date(),
      };

      dispatch({
        type: WEATHER_API_SEND,
        payload: {
          latitude: favorite.latitude,
          longitude: favorite.longitude,
          city: favorite.city,
          country: favorite.country,
        },
      });
      disableAutocomplete();
    },
    [disableAutocomplete, dispatch],
  );

  return (
    <>
      <div className={className} ref={wrapperRef}>
        <div className={styles.subContainer}>
          <div className={styles.spinner}>{isLoading ? <Spinner size={18} /> : null}</div>
          <div className={styles.searchIcon}>
            <SearchIcon style={{ fill: '#6C66FA' }} />
          </div>
          <Autocomplete
            options={autoCompleteOptions}
            getOptionLabel={option => option.title}
            onChange={(event, value) => {
              onClickMenuItem(value);
            }}
            noOptionsText={autoCompleteOptions.length === 0 ? 'Type to find a city' : 'No city found'}
            style={{ width: '100%' }}
            classes={{
              endAdornment: classes.endAdornment,
              popupIndicator: classes.popupIndicator,
              root: classes.autocompleteRoot,
              inputRoot: classes.inputRoot,
              input: classes.input,
              paper: classes.autocompletePaper,
              option: classes.option,
            }}
            renderInput={params => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                value={searchString}
                onBlur={() => setAutoCompleteOptions([])}
                onChange={updateTextField(setSearchString)}
                placeholder={placeholder}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    locationData: state.weatherData.location,
  };
};

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  locationData: PropTypes.objectOf(PropTypes.any).isRequired,
};

SearchBox.defaultProps = {
  placeholder: '',
  className: '',
};

export default connect(mapStateToProps)(SearchBox);
