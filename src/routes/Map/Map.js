import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as LocationSvg } from 'svgs/WeatherInfo/cloud_cover.svg';
import { ReactComponent as HumiditySvg } from 'svgs/WeatherInfo/humidity.svg';
import { ReactComponent as WindSvg } from 'svgs/WeatherInfo/wind.svg';
import { ReactComponent as PressureSvg } from 'svgs/WeatherInfo/pressure.svg';
import WithSvg from 'components/WithSvg/WithSvg';
import { Slider } from '@material-ui/core';
import MenuButton from 'components/MenuButton/MenuButton';
import { PageRoute, MapsRoute } from 'utils/routes';
import {
  CLOUD_COVER_MAP_TYPE,
  PRECIPITATION_MAP_TYPE,
  PRESSURE_MAP_TYPE,
  WIND_MAP_TYPE,
  TEMPERATURE_MAP_TYPE,
  WEEK_DAYS,
} from 'constants/constants';
import { withRouter } from 'react-router-dom';
import MapWeatherInfo from 'components/MapWeatherInfo/MapWeatherInfo';
import { WEATHER_MAP_API_SEND } from 'store/actionTypes/weatherMapActionTypes';
import styles from './Map.module.css';

const createMarks = () => {
  const followDay = new Date();
  const marks = [
    {
      value: 0,
      label: 'Today',
    },
  ];
  for (let i = 1; i <= 7; i += 1) {
    followDay.setDate(followDay.getDate() + 1);
    marks.push({
      value: i,
      label: WEEK_DAYS[followDay.getDay()],
    });
  }

  return marks;
};

const MARKS = createMarks();

const Map = props => {
  const { history } = props;

  const favorites = useSelector(state => state.favorites);
  const currentLocation = useSelector(state => state.data.ipStack);
  const weatherMap = useSelector(state => state.weatherMap);

  const { dataLocally } = favorites;

  const [favoriteClicked, setFavoriteClicked] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [weatherData, setWeatherData] = useState(null);

  const dispatch = useDispatch();

  const onChangeSlider = useCallback((event, newValue) => {
    setSliderIndex(newValue);
  }, []);

  useEffect(() => {
    if (!favoriteClicked) setFavoriteClicked(currentLocation);
  }, [currentLocation, favoriteClicked]);

  useEffect(() => {
    if (favoriteClicked) {
      dispatch({
        type: WEATHER_MAP_API_SEND,
        latitude: favoriteClicked.latitude,
        longitude: favoriteClicked.longitude,
      });
    }
  }, [dispatch, favoriteClicked]);

  useEffect(() => {
    if (weatherMap.daily.length > 0) {
      setWeatherData({
        summaryDay: weatherMap.daily[sliderIndex].summary,
        minTemp: weatherMap.daily[sliderIndex].temperatureLow,
        maxTemp: weatherMap.daily[sliderIndex].temperatureHigh,
        icon: weatherMap.daily[sliderIndex].icon,
      });
    }
  }, [sliderIndex, weatherMap.daily]);

  const [mapType, setMapType] = useState(CLOUD_COVER_MAP_TYPE);

  const setFavoritesMarkers = useCallback((favoritesArray, map) => {
    if (favoritesArray.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();

      for (const favorite of favoritesArray) {
        const bound = new window.google.maps.LatLng(favorite.latitude, favorite.longitude);
        const marker = new window.google.maps.Marker({
          position: bound,
          map,
        });
        marker.addListener('click', () => {
          setFavoriteClicked(favorite);
        });
        marker.setMap(map);
        bounds.extend(bound);
      }

      map.fitBounds(bounds);
    }
  }, []);

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('google-map'), {
      zoom: 4,
    });

    const myMapType = new window.google.maps.ImageMapType({
      getTileUrl(coord, zoom) {
        return `https://tile.openweathermap.org/map/${mapType}/${zoom}/${coord.x}/${coord.y}.png?appid=92525d1cc3a7d52b6259b05627c70e00`;
      },
      tileSize: new window.google.maps.Size(256, 256),
      maxZoom: 9,
      minZoom: 0,
      name: 'mymaptype',
    });

    map.overlayMapTypes.insertAt(0, myMapType);

    setFavoritesMarkers(dataLocally, map);
  }, [dataLocally, mapType, setFavoritesMarkers]);

  useEffect(() => {
    const path = history.location.pathname;
    if (path === `${PageRoute.map}${MapsRoute.cloudCover}`) {
      setMapType(CLOUD_COVER_MAP_TYPE);
    } else if (path === `${PageRoute.map}${MapsRoute.precipitation}`) {
      setMapType(PRECIPITATION_MAP_TYPE);
    } else if (path === `${PageRoute.map}${MapsRoute.pressure}`) {
      setMapType(PRESSURE_MAP_TYPE);
    } else if (path === `${PageRoute.map}${MapsRoute.wind}`) {
      setMapType(WIND_MAP_TYPE);
    } else if (path === `${PageRoute.map}${MapsRoute.temperature}`) {
      setMapType(TEMPERATURE_MAP_TYPE);
    }
  }, [history.location.pathname]);

  return (
    <div className={styles.container}>
      <div className={styles.favoriteContainer}>
        {!weatherMap.pending && weatherData && (
          <MapWeatherInfo
            city={favoriteClicked.city}
            weekDay={MARKS[sliderIndex].label}
            summaryDay={weatherData.summaryDay}
            minTemp={weatherData.minTemp}
            maxTemp={weatherData.maxTemp}
            icon={weatherData.icon}
          />
        )}
      </div>
      <div id="google-map" className={styles.mapContainer} />
      <div className={styles.menuButton}>
        <MenuButton path={`${PageRoute.map}${MapsRoute.cloudCover}`}>
          <WithSvg component={LocationSvg} size={22} />
        </MenuButton>
        <MenuButton path={`${PageRoute.map}${MapsRoute.temperature}`}>
          <WithSvg component={LocationSvg} size={22} />
        </MenuButton>
        <MenuButton path={`${PageRoute.map}${MapsRoute.wind}`}>
          <WithSvg component={WindSvg} size={22} />
        </MenuButton>
        <MenuButton path={`${PageRoute.map}${MapsRoute.precipitation}`}>
          <WithSvg component={HumiditySvg} size={22} />
        </MenuButton>
        <MenuButton path={`${PageRoute.map}${MapsRoute.pressure}`}>
          <WithSvg component={PressureSvg} size={22} />
        </MenuButton>
      </div>
      <div className={styles.slider}>
        <Slider track={false} marks={MARKS} onChange={onChangeSlider} value={sliderIndex} min={0} max={7} />
      </div>
    </div>
  );
};

Map.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(Map);
