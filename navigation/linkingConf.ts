import {LinkingOptions} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['/'],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Shops: {
            screens: {
              ShopsScreen: 'shops',
            },
          },
          ProfileScreens: {
            screens: {},
          },
          Cart: {
            screens: {
              CartScreen: 'cart',
            },
          },
          More: {
            screens: {
              OtherScreen: '',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
