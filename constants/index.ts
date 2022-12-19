import {Dimensions} from 'react-native';

const window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const map = {
  mapBoxToken:
    'SECRET TOKEN',
  mapBoxStyleURL: 'mapbox://styles/aliwonk/clbpdn452000014oilhmvewcu',
  centerCoordinates: [94.4424, 51.7197],
};

export {window, map};
