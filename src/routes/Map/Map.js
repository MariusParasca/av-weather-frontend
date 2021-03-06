import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';

import { ReactComponent as LocationSvg } from 'svgs/WeatherInfo/cloud_cover.svg';
import { ReactComponent as HumiditySvg } from 'svgs/WeatherInfo/humidity.svg';
import { ReactComponent as WindSvg } from 'svgs/WeatherInfo/wind.svg';
import { ReactComponent as PressureSvg } from 'svgs/WeatherInfo/pressure.svg';
import { ReactComponent as TemperatureSvg } from 'svgs/WeatherInfo/temperature.svg';
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
import { DELETE_FAVORITE_SEND } from 'store/actionTypes/favoritesActionTypes';
import { WEATHER_MAP_API_SEND } from 'store/actionTypes/weatherMapActionTypes';
import { withRouter } from 'react-router-dom';
import MapWeatherInfo from 'components/MapWeatherInfo/MapWeatherInfo';
import WithSvg from 'components/WithSvg/WithSvg';
import Spinner from 'components/Spinner/Spinner';

import { getFavoritesQuery } from 'utils/firestoreQueries';
import { getUid, getFavoritesDB, getFavoritesLocal, getDefaultLocation } from 'utils/stateGetters';
import { SEND_NOTIFICATION } from 'store/actionTypes/notificationActionTypes';
import styles from './Map.module.css';
import mapStyles from './mapStyle';
import './ControlMapStyles.css';

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

  const customZoomControl = useCallback((controlDiv, map) => {
    const controlUIzoomIn = document.getElementById('cd-zoom-in');
    const controlUIzoomOut = document.getElementById('cd-zoom-out');
    controlDiv.appendChild(controlUIzoomIn);
    controlDiv.appendChild(controlUIzoomOut);

    window.google.maps.event.addDomListener(controlUIzoomIn, 'click', () => {
      map.setZoom(map.getZoom() + 1);
    });
    window.google.maps.event.addDomListener(controlUIzoomOut, 'click', () => {
      map.setZoom(map.getZoom() - 1);
    });
  }, []);

  const customMapType = useCallback((controlDiv, map) => {
    const mapType = document.getElementById('cd-map');
    const satelliteType = document.getElementById('cd-satellite');

    controlDiv.appendChild(mapType);
    controlDiv.appendChild(satelliteType);

    window.google.maps.event.addDomListener(mapType, 'click', () => {
      map.setMapTypeId(window.google.maps.MapTypeId.ROADMAP);
      mapType.style.background = '#212056';
      satelliteType.style.background = '#131231';
    });

    window.google.maps.event.addDomListener(satelliteType, 'click', () => {
      map.setMapTypeId(window.google.maps.MapTypeId.SATELLITE);
      satelliteType.style.background = '#212056';
      mapType.style.background = '#131231';
    });
  }, []);

  const getIconMap = useCallback(
    () => ({
      path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
      fillColor: '#131231',
      fillOpacity: 1,
      anchor: new window.google.maps.Point(0, 0),
      strokeWeight: 0,
      scale: 1,
      labelOrigin: new window.google.maps.Point(0, -28),
    }),
    [],
  );

  const currentLocation = useSelector(state => state.weatherData.location);
  const weatherMap = useSelector(state => state.weatherMap);
  const defaultLocation = useSelector(getDefaultLocation);

  const uid = useSelector(getUid);

  useFirestoreConnect(getFavoritesQuery(uid));

  const favoritesDB = useSelector(getFavoritesDB);
  const favoritesLocal = useSelector(getFavoritesLocal);

  let favoritesData = [];

  if (uid) {
    favoritesData = favoritesDB || [];
  } else {
    favoritesData = favoritesLocal;
  }

  const [markers, setMarkers] = useState([]);
  const [favoriteIndex, setFavoriteIndex] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [currentMap, setCurrentMap] = useState(null);
  const [mapType, setMapType] = useState(CLOUD_COVER_MAP_TYPE);

  const dispatch = useDispatch();

  useEffect(() => {
    if (uid) {
      if (isLoaded(favoritesDB)) {
        const index = favoritesData.findIndex(fav => fav.city === currentLocation.city);
        setFavoriteIndex(index === -1 ? 0 : index);
      }
    } else {
      const index = favoritesData.findIndex(fav => fav.city === currentLocation.city);
      setFavoriteIndex(index === -1 ? 0 : index);
    }
  }, [favoritesDB, favoritesData, currentLocation, uid]);

  const nextCity = useCallback(() => {
    if (favoriteIndex === favoritesData.length - 1) {
      setFavoriteIndex(0);
    } else {
      setFavoriteIndex(favoriteIndex + 1);
    }
  }, [favoritesData.length, favoriteIndex]);

  const previousCity = useCallback(() => {
    if (favoriteIndex === 0) {
      setFavoriteIndex(favoritesData.length - 1);
    } else {
      setFavoriteIndex(favoriteIndex - 1);
    }
  }, [favoritesData.length, favoriteIndex]);

  const setFavoritesMarkers = useCallback(
    async (map, favorites, dailyWeather, sliderIndexParam, oldMarkers = []) => {
      if (favorites.length > 0 && dailyWeather.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        const markersAux = [];

        for (let i = 0; i < (oldMarkers.length > 0 ? oldMarkers.length : favorites.length); i += 1) {
          const favorite = favorites[i];
          if (oldMarkers.length > 0) {
            oldMarkers[i].setMap(null);
          }

          const bound = new window.google.maps.LatLng(favorite.latitude, favorite.longitude);
          const marker = new window.google.maps.Marker({
            position: bound,
            map,
            icon: getIconMap(),
            label: {
              text: `${Math.round(dailyWeather[i][sliderIndexParam].temperatureHigh)}°`,
              color: 'white',
            },
          });
          marker.addListener('click', () => {
            map.setCenter({ lat: favorite.latitude, lng: favorite.longitude });
            setFavoriteIndex(i);
          });
          marker.setMap(map);
          markersAux.push(marker);
          bounds.extend(bound);
        }

        map.fitBounds(bounds);
        setMarkers(markersAux);
      }
    },
    [getIconMap],
  );

  const deleteCity = useCallback(() => {
    if (
      favoritesData[favoriteIndex].city !== currentLocation.city &&
      favoritesData[favoriteIndex].city !== defaultLocation.city
    ) {
      markers[favoriteIndex].setMap(null);
      dispatch({ type: DELETE_FAVORITE_SEND, index: favoriteIndex, id: favoritesData[favoriteIndex].id });
      setFavoriteIndex(0);
      const newMarkers = [...markers];
      newMarkers.splice(favoriteIndex, 1);

      setFavoritesMarkers(currentMap, favoritesData, weatherMap.daily, sliderIndex, newMarkers);
    } else if (favoritesData[favoriteIndex].city === defaultLocation.city) {
      dispatch({ type: SEND_NOTIFICATION, status: 'warning', message: "Can't delete default location" });
    } else {
      dispatch({ type: SEND_NOTIFICATION, status: 'warning', message: "Can't delete current selected location" });
    }
  }, [
    favoritesData,
    favoriteIndex,
    currentLocation.city,
    defaultLocation.city,
    markers,
    dispatch,
    setFavoritesMarkers,
    currentMap,
    weatherMap.daily,
    sliderIndex,
  ]);

  const onChangeSlider = useCallback(
    (event, newValue) => {
      setFavoritesMarkers(currentMap, favoritesData, weatherMap.daily, sliderIndex, markers);
      setSliderIndex(newValue);
    },
    [currentMap, favoritesData, markers, setFavoritesMarkers, sliderIndex, weatherMap.daily],
  );

  useEffect(() => {
    if (uid) {
      if (
        (isLoaded(favoritesDB) && weatherMap.daily.length === 0) ||
        weatherMap.daily.length !== favoritesData.length
      ) {
        dispatch({
          type: WEATHER_MAP_API_SEND,
          favorites: favoritesData,
        });
      }
    } else if (weatherMap.daily.length === 0 || weatherMap.daily.length !== favoritesData.length) {
      dispatch({
        type: WEATHER_MAP_API_SEND,
        favorites: favoritesData,
      });
    }
  }, [
    favoritesData.length,
    dispatch,
    weatherMap.daily.length,
    weatherMap.hourly.length,
    favoritesData,
    uid,
    favoritesDB,
  ]);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById('google-map'), {
        styles: mapStyles,
        mapTypeId: window.google.maps.MapTypeId.SATELLITE,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      const zoomControlDiv = document.createElement('div');
      customZoomControl(zoomControlDiv, map);

      const customMapTypeDiv = document.createElement('div');
      customMapType(customMapTypeDiv, map);

      // const quickZoomDiv = document.createElement('div');
      // quickZoomControl(quickZoomDiv, map);

      map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);
      map.controls[window.google.maps.ControlPosition.LEFT_TOP].push(customMapTypeDiv);
      // map.controls[window.google.maps.ControlPosition.RIGHT_TOP].push(quickZoomDiv);

      setFavoritesMarkers(map, favoritesData, weatherMap.daily, sliderIndex);
      setCurrentMap(map);
    };
    if (uid) {
      if (
        isLoaded(favoritesDB) &&
        !currentMap &&
        weatherMap.daily.length > 0 &&
        weatherMap.daily.length === favoritesData.length
      ) {
        initMap();
      }
    } else if (!currentMap && weatherMap.daily.length > 0 && weatherMap.daily.length === favoritesData.length) {
      initMap();
    }
  }, [
    currentMap,
    customMapType,
    customZoomControl,
    favoritesDB,
    favoritesData,
    favoritesData.length,
    setFavoritesMarkers,
    sliderIndex,
    uid,
    weatherMap.daily,
    weatherMap.daily.length,
    weatherMap.pending,
  ]);

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

  useEffect(() => {
    if (currentMap) {
      const myMapType = new window.google.maps.ImageMapType({
        getTileUrl(coord, zoom) {
          return `https://tile.openweathermap.org/map/${mapType}/${zoom}/${coord.x}/${coord.y}.png?appid=92525d1cc3a7d52b6259b05627c70e00`;
        },
        tileSize: new window.google.maps.Size(256, 256),
        maxZoom: 9,
        minZoom: 0,
        name: 'mymaptype',
      });

      currentMap.overlayMapTypes.clear();
      currentMap.overlayMapTypes.insertAt(0, myMapType);
    }
  }, [currentMap, mapType]);

  let mapWeatherInfo;
  if (uid) {
    if (isLoaded(favoritesDB) && !weatherMap.pending && weatherMap.daily.length === favoritesData.length) {
      mapWeatherInfo = (
        <MapWeatherInfo
          city={favoritesData[favoriteIndex].city}
          country={favoritesData[favoriteIndex].country}
          day={weatherMap.daily[favoriteIndex][sliderIndex]}
          hourly={weatherMap.hourly[favoriteIndex][sliderIndex]}
          dailyHourly={weatherMap.hourly[favoriteIndex]}
          onClickRightArrow={nextCity}
          onClickLeftArrow={previousCity}
          onClickDelete={deleteCity}
        />
      );
    }
  } else if (!weatherMap.pending && weatherMap.daily.length === favoritesData.length) {
    mapWeatherInfo = (
      <MapWeatherInfo
        city={favoritesData[favoriteIndex].city}
        country={favoritesData[favoriteIndex].country}
        day={weatherMap.daily[favoriteIndex][sliderIndex]}
        hourly={weatherMap.hourly[favoriteIndex][sliderIndex]}
        dailyHourly={weatherMap.hourly[favoriteIndex]}
        onClickRightArrow={nextCity}
        onClickLeftArrow={previousCity}
        onClickDelete={deleteCity}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.favoriteContainer}>{mapWeatherInfo || <Spinner />}</div>
      <div id="customButtons">
        <div id="cd-map">Map</div>
        <div id="cd-satellite">Satellite</div>
        <div id="cd-zoom-in" />
        <div id="cd-zoom-out" />
        <div id="cd-quick-access">quick zoom</div>
      </div>
      <div id="google-map" className={styles.mapContainer} />
      <div className={styles.menuButton}>
        <MenuButton path={`${PageRoute.map}${MapsRoute.temperature}`}>
          <WithSvg component={TemperatureSvg} size={22} />
        </MenuButton>
        <MenuButton path={`${PageRoute.map}${MapsRoute.cloudCover}`}>
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
