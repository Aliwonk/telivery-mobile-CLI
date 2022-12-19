import {Dimensions} from 'react-native';

const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const map = {
  mapBoxToken:
    'pk.eyJ1IjoiYWxpd29uayIsImEiOiJjbGJuemp4MHUwdnluM29sOTB4NDRveDc4In0.ca9oT1Xiheo19LUqkHK8lA',
  mapBoxStyleURL: 'mapbox://styles/aliwonk/clbpdn452000014oilhmvewcu',
  centerCoordinates: [94.4424, 51.7197],
};

export {window, map};
