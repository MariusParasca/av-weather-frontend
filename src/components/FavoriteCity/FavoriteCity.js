import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, IconButton } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { ReactComponent as StarFilledSvg } from 'svgs/Favorites/star_filled.svg';
import { ReactComponent as PrecipitationSvg } from 'svgs/WeatherInfo/precipitation.svg';
import { ReactComponent as PressureSvg } from 'svgs/WeatherInfo/pressure.svg';
import { ReactComponent as HumiditySvg } from 'svgs/WeatherInfo/humidity.svg';
import { ReactComponent as CloudCoverSvg } from 'svgs/WeatherInfo/cloud_cover.svg';
import { ReactComponent as UvIndexSvg } from 'svgs/WeatherInfo/uv_index.svg';
import { ReactComponent as VisibilitySvg } from 'svgs/WeatherInfo/visibility.svg';
import { ReactComponent as dewPointSvg } from 'svgs/WeatherInfo/dew_point.svg';
import WithSvg from 'components/WithSvg/WithSvg';
import LabeledCircularProgress from 'components/LabeledCircularProgress/LabeledCircularProgress';
import { createDateFromEpoch } from 'utils/dateTimeUtils';
import { WEEK_DAYS } from 'constants/constants';
import { capitalizeFirstLetter } from 'utils/helperFunctions';
import styles from './FavoriteCity.module.css';
import ForecastDay from './ForecastDay/ForecastDay';

const useStyles = makeStyles(() => ({
  starButtonRoot: {
    padding: 0,
    minWidth: 0,
  },
  iconButton: {
    padding: '1px',
    paddingTop: 0,
    marginLeft: '2%',
  },
  typoWeatherInfo: {
    color: '#44448a',
    fontSize: '1.45vh',
  },
  typoLabel: {
    fontSize: '14px',
    color: '#44448a',
  },
  typoTemp: {
    fontSize: {
      fontSize: '4.7vh',
    },
  },
}));

const FavoriteCity = props => {
  const { city, country, onClickIcon, currently, daily, minTemp, maxTemp } = props;

  const distanceScale = useSelector(state => state.userSettings.settings.weatherUnits.distance);
  const temperatureScale = useSelector(state => state.userSettings.settings.weatherUnits.temperature);

  const weatherContainerRef = useRef();

  const [circularProgressSize, setCircularProgressSize] = useState(0);

  const classes = useStyles();

  const [image, setImage] = useState('');

  useEffect(() => {
    const getImage = async image => {
      const imageImported = await import(`../../images/TypeOfWeather/${image}.png`);
      setImage(imageImported);
    };
    if (currently && currently.icon) {
      getImage(currently.icon);
    }
  }, [currently]);

  useEffect(() => {
    const resizeCircularProgress = () => {
      setCircularProgressSize((weatherContainerRef.current.offsetHeight * 1) / 2);
    };

    resizeCircularProgress();

    if (weatherContainerRef && weatherContainerRef.current) {
      window.addEventListener('resize', resizeCircularProgress);
    }

    return () => {
      window.removeEventListener('resize', resizeCircularProgress);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img className={styles.imageResponsive} alt="weather icon" src={image.default} />
      </div>
      <div className={styles.cityCountryContainer}>
        <Typography variant="h3">
          {city}, {country}
        </Typography>
        <IconButton classes={{ root: classes.iconButton }} onClick={onClickIcon}>
          <WithSvg component={StarFilledSvg} size={16} />
        </IconButton>
      </div>
      <Typography variant="h2" classes={{ root: classes.typoTemp }}>
        {Math.round(currently.temperature)}°{temperatureScale}
      </Typography>
      <div className={styles.todayWeatherContainer} ref={weatherContainerRef}>
        <div className={styles.circularProgressContainer}>
          <LabeledCircularProgress
            circularProgressSize={circularProgressSize}
            strokeWidth={(1 / 10) * circularProgressSize}
            progressValue={Math.round(currently.windSpeed)}
          />
        </div>
        <div className={styles.todayWeatherSubContainer}>
          <div className={styles.todayWeatherIconsContainer}>
            <WithSvg component={PrecipitationSvg} size={20} />
            <WithSvg component={PressureSvg} size={20} />
            <WithSvg component={HumiditySvg} size={20} />
          </div>
          <div className={styles.todayWeatherTextContainer}>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                {Math.round(currently.precipProbability * 100)}%
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                {currently.pressure}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                {Math.round(currently.humidity * 100)}%
              </Typography>
            </div>
          </div>
        </div>
        <div className={styles.todayWeatherSubContainer}>
          <div className={styles.todayWeatherIconsContainer}>
            <WithSvg component={CloudCoverSvg} size={20} />
            <WithSvg component={UvIndexSvg} size={20} />
            <WithSvg component={VisibilitySvg} size={20} />
          </div>
          <div className={styles.todayWeatherTextContainer}>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                {Math.round(currently.cloudCover * 100)}%
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                {currently.uvIndex}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                {Math.round(currently.visibility)}
                {distanceScale}
              </Typography>
            </div>
          </div>
        </div>
        <div className={styles.todayWeatherSubContainer}>
          <div className={styles.todayWeatherIconsContainer}>
            <Typography variant="subtitle2" classes={{ root: classes.typoLabel }}>
              Min
            </Typography>
            <Typography variant="subtitle2" classes={{ root: classes.typoLabel }}>
              Max
            </Typography>
            <WithSvg component={dewPointSvg} size={20} />
          </div>
          <div className={styles.todayWeatherTextContainer}>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                {Math.round(minTemp)}°
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                {Math.round(maxTemp)}°
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                {currently.dewPoint}°
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.forecastContainer}>
        {daily.map((day, index) => (
          <ForecastDay
            key={day.time}
            temperature={day.temperatureHigh}
            icon={day.icon}
            dayName={index === 0 ? 'Today' : capitalizeFirstLetter(WEEK_DAYS[createDateFromEpoch(day.time).getDay()])}
          />
        ))}
      </div>
    </div>
  );
};

FavoriteCity.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  onClickIcon: PropTypes.func,
  currently: PropTypes.objectOf(PropTypes.any).isRequired,
  daily: PropTypes.arrayOf(PropTypes.any).isRequired,
  minTemp: PropTypes.number.isRequired,
  maxTemp: PropTypes.number.isRequired,
};

FavoriteCity.defaultProps = {
  onClickIcon: undefined,
};

export default FavoriteCity;
