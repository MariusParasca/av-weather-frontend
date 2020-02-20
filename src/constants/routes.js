import { PageRoute, ChartsRoute } from 'utils/routes';

export const topContainerRoutes = [
  PageRoute.home,
  `${PageRoute.charts}${ChartsRoute.temperature}`,
  `${PageRoute.charts}${ChartsRoute.precipitation}`,
  `${PageRoute.charts}${ChartsRoute.humidity}`,
  `${PageRoute.charts}${ChartsRoute.wind}`,
  `${PageRoute.charts}${ChartsRoute.pressure}`,
  PageRoute.history,
];

export const bottomContainerRoutes = [
  PageRoute.home,
  PageRoute.charts,
  PageRoute.history,
  `${PageRoute.charts}${ChartsRoute.temperature}`,
  `${PageRoute.charts}${ChartsRoute.precipitation}`,
  `${PageRoute.charts}${ChartsRoute.humidity}`,
  `${PageRoute.charts}${ChartsRoute.wind}`,
  `${PageRoute.charts}${ChartsRoute.pressure}`,
];
