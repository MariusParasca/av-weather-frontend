import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import { zeroPadTime, getHourFromEpoch } from 'utils/dateTimeUtils';
import { Typography } from '@material-ui/core';
import WithSvg from 'components/WithSvg/WithSvg';
import { ReactComponent as PartlyCloudyDaySvg } from 'svgs/weatherTypes/partly-cloudy-day.svg';
import styles from './CurrentWeather.module.css';

import getHourlyChartOption from 'charts/hourlyChart';

const CurrentWeather = props => {
  const { city, country, weatherData, className } = props;

  const [currentTime, setCurrentTime] = useState('00:00');
  const [hourly, setHourly] = useState([]);
  const [timeline, setTimeline] = useState([]);

  const startClock = () => {
    const currentDate = new Date();
    const currentHours = zeroPadTime(currentDate.getHours());
    const currentMinutes = zeroPadTime(currentDate.getMinutes());

    setCurrentTime(`${currentHours}:${currentMinutes}`);
  };

  useEffect(() => {
    const hourly = [];
    const nightHourly = [];
    const timeline = [];

    for (const weatherHour of weatherData.hourly) {
      hourly.push(weatherHour.temperature);
      timeline.push(`${getHourFromEpoch(weatherHour.time)}:00`);
    }
    setHourly(hourly);
    setTimeline(timeline);
  }, [weatherData]);

  useEffect(() => {
    startClock();
    setInterval(startClock, 60 * 1000);
  }, []);

  return (
    <div className={`${className}`}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <Typography variant="subtitle1">Local Time: {currentTime}</Typography>
          <div className={styles.locationContainer}>
            <Typography variant="h4">{`${city}, ${country}`.toUpperCase()}</Typography>
          </div>
          <div className={styles.temperatureContainer}>
            <Typography variant="h1">{`${Math.round(weatherData.temperature)}°C`}</Typography>
            <WithSvg component={PartlyCloudyDaySvg} size={78} className={styles.icon} />
          </div>
          <div className={styles.descriptionContainer}>
            <Typography variant="h5">{weatherData.description} </Typography>
          </div>
          <div className={styles.feelsLikeContainer}>
            <Typography variant="h5">Feels like {Math.round(weatherData.feelsLike)}°</Typography>
          </div>
        </div>
        <div className={styles.rightContainer}>TODO</div>
      </div>
      <ReactEcharts option={getHourlyChartOption(timeline, hourly)} />
    </div>
  );
};
/* 
  option={{
          legend: {
            data: ['Day', 'Night'],
            left: '20',
            orient: 'vertical',
          },
          tooltip: {
            trigger: 'axis',
            // axisPointer: {
            //   type: 'cross',
            //   label: {
            //     backgroundColor: '#6a7985',
            //   },
            // },
          },
          grid: {
            left: '0%',
            right: '0%',
            bottom: '1%',
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              // splitLine: {
              //   show: false,
              // },
              // axisTick: {
              //   show: false,
              // },
              axisLabel: {
                show: true,
              },
              data: timeline,
            },
          ],
          yAxis: [
            {
              type: 'value',
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
            },
          ],
          series: [
            {
              name: 'Day',
              type: 'line',
              areaStyle: {},
              data: hourly,
            },
            // {
            //   name: 'Night',
            //   type: 'line',
            //   areaStyle: {},
            //   data: nightHourly,
            // },
          ],
        }}
*/

CurrentWeather.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  className: PropTypes.string,
  weatherData: PropTypes.shape({
    temperature: PropTypes.number,
    description: PropTypes.string,
    feelsLike: PropTypes.number,
    hourly: PropTypes.array,
    sunriseTime: PropTypes.number.isRequired,
    sunsetTime: PropTypes.number.isRequired,
  }).isRequired,
};

CurrentWeather.defaultProps = {
  className: '',
};

export default CurrentWeather;
