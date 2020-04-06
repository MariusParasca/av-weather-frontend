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
import { WEATHER_MAP_DELETE_BY_INDEX, WEATHER_MAP_API_SEND } from 'store/actionTypes/weatherMapActionTypes';
import { withRouter } from 'react-router-dom';
import MapWeatherInfo from 'components/MapWeatherInfo/MapWeatherInfo';

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

const mapOptions = {
  styles: mapStyles,
  mapTypeId: window.google.maps.MapTypeId.SATELLITE,
  mapTypeControl: false,
  zoomControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};

const customZoomControl = (controlDiv, map) => {
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
};

const customMapType = (controlDiv, map) => {
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
};

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
  const [currentMap, setCurrentMap] = useState(null);
  const [mapType, setMapType] = useState(CLOUD_COVER_MAP_TYPE);

  const dispatch = useDispatch();

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
      dispatch({ type: WEATHER_MAP_DELETE_BY_INDEX, index: favoriteIndex });
      dispatch({ type: DELETE_FAVORITE_LOCALLY_SEND, index: favoriteIndex });

      const newMarkers = [...markers];
      newMarkers.splice(favoriteIndex, 1);

      const bounds = new window.google.maps.LatLngBounds();

      const markersForMap = [];
      for (let i = 0; i < newMarkers.length; i += 1) {
        const newMarker = newMarkers[i];
        newMarker.setMap(null);
        const bound = new window.google.maps.LatLng(newMarker.getPosition().lat(), newMarker.getPosition().lng());
        const markerForMap = new window.google.maps.Marker({
          position: bound,
          map: currentMap,
        });

        markerForMap.addListener('click', () => {
          currentMap.setCenter({ lat: newMarker.getPosition().lat(), lng: newMarker.getPosition().lng() });
          setFavoriteIndex(i);
        });
        markerForMap.setMap(currentMap);
        markersForMap.push(markerForMap);
        bounds.extend(bound);
      }

      currentMap.fitBounds(bounds);
      setMarkers(markersForMap);
    }
  }, [currentLocation.city, currentMap, dataLocally, dispatch, favoriteIndex, markers]);

  const setFavoritesMarkers = useCallback(
    async (map, oldMarkers = []) => {
      console.log('oldMarkers', oldMarkers);
      if (dataLocally.length > 0 && weatherMap.daily.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        console.log('in if');
        const markersAux = [];

        for (let i = 0; i < dataLocally.length; i += 1) {
          const favorite = dataLocally[i];

          if (oldMarkers.length > 0) {
            oldMarkers[i].setMap(null);
          }

          const bound = new window.google.maps.LatLng(favorite.latitude, favorite.longitude);
          const marker = new window.google.maps.Marker({
            position: bound,
            map,
            label: `${Math.round(weatherMap.daily[i][sliderIndex].temperatureHigh)}°`,
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
    [dataLocally, sliderIndex, weatherMap.daily],
  );

  const onChangeSlider = useCallback(
    (event, newValue) => {
      console.log('hei');
      setFavoritesMarkers(currentMap, markers);
      setSliderIndex(newValue);
    },
    [currentMap, markers, setFavoritesMarkers],
  );

  useEffect(() => {
    if (favoriteIndex === -1 && currentLocation)
      setFavoriteIndex(dataLocally.findIndex(fav => fav.city === currentLocation.city));
  }, [currentLocation, dataLocally, favoriteIndex]);

  useEffect(() => {
    dispatch({
      type: WEATHER_MAP_API_SEND,
    });
  }, [dispatch]);

  useEffect(() => {
    if (favoriteIndex !== -1 && weatherMap.daily.length > 0) {
      setWeatherData({
        day: weatherMap.daily[favoriteIndex][sliderIndex],
        hourly: weatherMap.hourly[favoriteIndex][sliderIndex],
      });
    }
  }, [favoriteIndex, sliderIndex, weatherMap]);

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('google-map'), mapOptions);

    const zoomControlDiv = document.createElement('div');
    customZoomControl(zoomControlDiv, map);

    const customMapTypeDiv = document.createElement('div');
    customMapType(customMapTypeDiv, map);

    map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);
    map.controls[window.google.maps.ControlPosition.LEFT_TOP].push(customMapTypeDiv);

    setCurrentMap(map);
  }, []);

  useEffect(() => {
    if (currentMap) setFavoritesMarkers(currentMap);
  }, [currentMap, setFavoritesMarkers]);

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

  return (
    <div className={styles.container}>
      <div className={styles.favoriteContainer}>
        {!weatherMap.pending && weatherData && dataLocally[favoriteIndex] && (
          <MapWeatherInfo
            city={dataLocally[favoriteIndex].city}
            day={weatherData.day}
            hourly={weatherData.hourly}
            onClickRightArrow={nextCity}
            onClickLeftArrow={previousCity}
            onClickDelete={deleteCity}
          />
        )}
      </div>
      <div id="customButtons">
        <div id="cd-map">Map</div>
        <div id="cd-satellite">Satellite</div>
        <div id="cd-zoom-in" />
        <div id="cd-zoom-out" />
      </div>
      <div id="google-map" className={styles.mapContainer} />
      <div className={styles.menuButton}>
        <MenuButton path={`${PageRoute.map}${MapsRoute.temperature}`}>
          <WithSvg component={LocationSvg} size={22} />
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
