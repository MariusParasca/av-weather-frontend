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
import { DELETE_FAVORITE_LOCALLY_SEND } from 'store/actionTypes/favoritesActionTypes';
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

  const [markers, setMarkers] = useState([]);
  const [favoriteIndex, setFavoriteIndex] = useState(-1);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [weatherData, setWeatherData] = useState(null);

  const dispatch = useDispatch();

  console.log('favoriteIndex', favoriteIndex);

  const nextCity = useCallback(() => {
    if (favoriteIndex === dataLocally.length - 1) {
      setFavoriteIndex(0);
    } else {
      setFavoriteIndex(favoriteIndex + 1);
    }
  }, [dataLocally.length, favoriteIndex]);

  const previousCity = useCallback(() => {
    if (favoriteIndex === 0) {
      setFavoriteIndex(dataLocally.length - 1);
    } else {
      setFavoriteIndex(favoriteIndex - 1);
    }
  }, [dataLocally.length, favoriteIndex]);

  const deleteCity = useCallback(() => {
    if (dataLocally[favoriteIndex].city !== currentLocation.city) {
      markers[favoriteIndex].setMap(null);
      setMarkers(oldMarkers => {
        const newMarkers = [...oldMarkers];
        return newMarkers.splice(favoriteIndex, 1);
      });
      dispatch({ type: DELETE_FAVORITE_LOCALLY_SEND, index: favoriteIndex });
    }
  }, [currentLocation.city, dataLocally, dispatch, favoriteIndex, markers]);

  const onChangeSlider = useCallback((event, newValue) => {
    setSliderIndex(newValue);
  }, []);

  useEffect(() => {
    if (favoriteIndex === -1 && currentLocation)
      setFavoriteIndex(dataLocally.findIndex(fav => fav.city === currentLocation.city));
  }, [currentLocation, dataLocally, favoriteIndex]);

  useEffect(() => {
    if (favoriteIndex !== -1 && dataLocally[favoriteIndex]) {
      dispatch({
        type: WEATHER_MAP_API_SEND,
        latitude: dataLocally[favoriteIndex].latitude,
        longitude: dataLocally[favoriteIndex].longitude,
      });
    }
  }, [dataLocally, dispatch, favoriteIndex]);

  useEffect(() => {
    if (weatherMap.daily.length > 0) {
      setWeatherData({
        summaryDay: weatherMap.daily[sliderIndex].summary,
        minTemp: weatherMap.daily[sliderIndex].temperatureLow,
        maxTemp: weatherMap.daily[sliderIndex].temperatureHigh,
        icon: weatherMap.daily[sliderIndex].icon,
        hourly: weatherMap.hourly[sliderIndex],
      });
    }
  }, [sliderIndex, weatherMap.daily, weatherMap.hourly]);

  const [mapType, setMapType] = useState(CLOUD_COVER_MAP_TYPE);

  const setFavoritesMarkers = useCallback((favoritesArray, map) => {
    if (favoritesArray.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      const markersAux = [];

      for (let i = 0; i < favoritesArray.length; i += 1) {
        const favorite = favoritesArray[i];
        const bound = new window.google.maps.LatLng(favorite.latitude, favorite.longitude);
        const marker = new window.google.maps.Marker({
          position: bound,
          map,
        });
        marker.addListener('click', () => {
          setFavoriteIndex(i);
        });
        marker.setMap(map);
        markersAux.push(marker);
        bounds.extend(bound);
      }
      setMarkers(markersAux);
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
        {!weatherMap.pending && weatherData && dataLocally[favoriteIndex] && (
          <MapWeatherInfo
            city={dataLocally[favoriteIndex].city}
            weekDay={MARKS[sliderIndex].label}
            summaryDay={weatherData.summaryDay}
            minTemp={weatherData.minTemp}
            maxTemp={weatherData.maxTemp}
            icon={weatherData.icon}
            hourly={weatherData.hourly}
            onClickRightArrow={nextCity}
            onClickLeftArrow={previousCity}
            onClickDelete={deleteCity}
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
