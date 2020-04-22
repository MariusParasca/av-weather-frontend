import { PageRoute, MapsRoute } from 'utils/routes';

export const LEFT_DRAWER_WIDTH = 76;
export const RIGHT_DRAWER_WIDTH = 380;

export const MAX_UV = 20;
export const MAX_PRESSURE = 10000;
export const MAX_VISIBILITY = 25;
export const MAX_DEW_POINT = 25;
export const MAX_WIND = 40;
export const MAX_AIQ = 200;

export const WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const DAY_NO_HOURS = 24;
export const CHART_OPTIONS = ['Week', 'Day 24h'];
export const CHART_SUB_PAGE_TITLES = [
  'Temperature (C°)',
  'Precipitation (%)',
  'Humidity (%)',
  'Wind (m/s)',
  'Pressure (mb)',
];
export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const DEFAULT_VIEWS = ['Home', 'Favorites', 'Map', 'Charts'];

export const DEFAULT_VIEWS_MAP_OBJECT = {
  Home: PageRoute.home,
  Favorites: PageRoute.favorites,
  Map: `${PageRoute.map}${MapsRoute.temperature}`,
  Charts: `${PageRoute.charts}`,
};

export const ONE_MINUTE_IN_MILLISECONDS = 60000;

export const EMAIL_ALREADY_USED = 'auth/email-already-in-use';

export const SEARCH_PLACEHOLDER = 'City, postcode or place';

export const AIR_WEATHER_TYPE = 'air';
export const STANDARD_WEATHER_TYPE = 'standard';
export const WIND_WEATHER_TYPE = 'wind';

export const CLOUD_COVER_MAP_TYPE = 'clouds_new';
export const PRECIPITATION_MAP_TYPE = 'precipitation_new';
export const PRESSURE_MAP_TYPE = 'pressure_new';
export const WIND_MAP_TYPE = 'wind_new';
export const TEMPERATURE_MAP_TYPE = 'temp_new';

export const EUROPEAN_UNITS = 'si';
export const AMERICAN_UNITS = 'us';
