import { PageRoute, MapsRoute } from 'utils/routes';

export const topContainerRoutes = [PageRoute.home, PageRoute.history];

export const bottomContainerRoutes = [
  PageRoute.home,
  PageRoute.charts,
  PageRoute.history,
  PageRoute.charts,
  `${PageRoute.map}${MapsRoute.cloudCover}`,
  `${PageRoute.map}${MapsRoute.temperature}`,
  `${PageRoute.map}${MapsRoute.wind}`,
  `${PageRoute.map}${MapsRoute.precipitation}`,
  `${PageRoute.map}${MapsRoute.pressure}`,
];
