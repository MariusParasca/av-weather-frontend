const mainColor = '#2d313f';
const saturationValue = -20;
const brightnessValue = 5;

const mapStyles = [
  {
    // set saturation for the labels on the map
    elementType: 'labels',
    stylers: [{ saturation: saturationValue }],
  },
  {
    // poi stands for point of interest - don't show these lables on the map
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    // don't show highways lables on the map
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    // don't show local road lables on the map
    featureType: 'road.local',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    // don't show arterial road lables on the map
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    // don't show road lables on the map
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }],
  },
  // style different elements on the map
  {
    featureType: 'transit',
    elementType: 'geometry.fill',
    stylers: [
      { hue: mainColor },
      { visibility: 'on' },
      { lightness: brightnessValue },
      { saturation: saturationValue },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [
      { hue: mainColor },
      { visibility: 'on' },
      { lightness: brightnessValue },
      { saturation: saturationValue },
    ],
  },
  {
    featureType: 'poi.government',
    elementType: 'geometry.fill',
    stylers: [
      { hue: mainColor },
      { visibility: 'on' },
      { lightness: brightnessValue },
      { saturation: saturationValue },
    ],
  },
  {
    featureType: 'poi.sport_complex',
    elementType: 'geometry.fill',
    stylers: [
      { hue: mainColor },
      { visibility: 'on' },
      { lightness: brightnessValue },
      { saturation: saturationValue },
    ],
  },
  {
    featureType: 'poi.attraction',
    elementType: 'geometry.fill',
    stylers: [
      { hue: mainColor },
      { visibility: 'on' },
      { lightness: brightnessValue },
      { saturation: saturationValue },
    ],
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry.fill',
    stylers: [
      { hue: mainColor },
      { visibility: 'on' },
      { lightness: brightnessValue },
      { saturation: saturationValue },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry.fill',
    stylers: [
      { hue: mainColor },
      { visibility: 'on' },
      { lightness: brightnessValue },
      { saturation: saturationValue },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry.fill',
    stylers: [
      { hue: mainColor },
      { visibility: 'on' },
      { lightness: brightnessValue },
      { saturation: saturationValue },
    ],
  },
  {
    featureType: 'landscape',
    stylers: [
      { hue: mainColor },
      { visibility: 'on' },
      { lightness: brightnessValue },
      { saturation: saturationValue },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      { hue: mainColor },
      { visibility: 'on' },
      { lightness: brightnessValue },
      { saturation: saturationValue },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      { hue: mainColor },
      { visibility: 'on' },
      { lightness: brightnessValue },
      { saturation: saturationValue },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      { hue: mainColor },
      { visibility: 'on' },
      { lightness: brightnessValue },
      { saturation: saturationValue },
    ],
  },
];

export default mapStyles;
