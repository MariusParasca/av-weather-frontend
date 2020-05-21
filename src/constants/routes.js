import { PageRoute, MapsRoute } from 'utils/routes';

export const topContainerRoutes = [PageRoute.home];

export const mapRoutes = [
  `${PageRoute.map}${MapsRoute.cloudCover}`,
  `${PageRoute.map}${MapsRoute.temperature}`,
  `${PageRoute.map}${MapsRoute.wind}`,
  `${PageRoute.map}${MapsRoute.precipitation}`,
  `${PageRoute.map}${MapsRoute.pressure}`,
];
