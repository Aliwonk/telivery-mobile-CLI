import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {
  OtherStackParamList,
  ProfileStackParamList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types/navigation';
import linking from './linkingConf';

// IMPORT ICONS

import CartSVGIcon from '../assets/icons/Cart_alt.svg';
import HomeSVGIcon from '../assets/icons/Home_alt.svg';
import LocationSVGIcon from '../assets/icons/Location.svg';
import ProfileSVGIcon from '../assets/icons/User_male_circle.svg';
import MenuSVGIcon from '../assets/icons/Circle_menu.svg';

// IMPORT SCREENS

import HomeScreen from '../screens/home';
import NotFoundScreen from '../screens/notFound';
import MapScreen from '../screens/map';
import CartScreen from '../screens/cart';
import AuthScreen from '../screens/auth/AuthScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProfileScreen from '../screens/profile';
import OrdersScreen from '../screens/orders';
import OtherScreen from '../screens/other';

export default function Navigation() {
  return (
    <NavigationContainer linking={linking}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {true ? (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{title: 'Oops!'}}
          />
        </>
      ) : (
        <>
          <Stack.Group>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Group screenOptions={{headerShown: false}}>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
        <ProfileStack.Screen name="Orders" component={OrdersScreen} />
      </ProfileStack.Group>
    </ProfileStack.Navigator>
  );
};

const OtherScreenStack = createNativeStackNavigator<OtherStackParamList>();

const OtherNavigator: React.FC = () => {
  return (
    <OtherScreenStack.Navigator initialRouteName="Other">
      <OtherScreenStack.Group screenOptions={{headerShown: false}}>
        <OtherScreenStack.Screen name="Other" component={OtherScreen} />
      </OtherScreenStack.Group>
    </OtherScreenStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator<RootTabParamList>();
const iconSize = {
  width: 25,
  height: 25,
};
function BottomTabNavigator() {
  // const colorScheme = useColorScheme();
  // const userRoles = useAppSelector(state => state.auth.user?.roles);
  const userRoles = ['USER', 'OWNER'];
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    userRoles.forEach(roles => {
      setRole(roles);
    });
  }, []);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 67,
          paddingBottom: 7,
        },
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'ГЛАВНАЯ',
          tabBarIcon: () => <HomeSVGIcon />,
        }}
      />
      <BottomTab.Screen
        name="Map"
        component={MapScreen}
        options={({navigation}: RootTabScreenProps<'Map'>) => ({
          title: 'КАРТА',
          tabBarIcon: () => (
            <LocationSVGIcon width={iconSize.width} height={iconSize.height} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'КОРЗИНА',
          tabBarIcon: () => {
            return (
              <>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    position: 'absolute',
                    fontSize: 8,
                    top: 33,
                    backgroundColor: 'black',
                    borderRadius: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                    color: 'white',
                  }}>
                  1200
                </Text>
                <CartSVGIcon
                  style={{marginBottom: 5}}
                  width={iconSize.width}
                  height={iconSize.width}
                />
              </>
            );
          },
        }}
      />
      <BottomTab.Screen
        name="ProfileScreens"
        component={ProfileNavigator}
        options={{
          title: 'ПРОФИЛЬ',
          tabBarIcon: () => (
            <ProfileSVGIcon width={iconSize.width} height={iconSize.height} />
          ),
        }}
      />
      {(role === 'OWNER' || role === 'ADMIN') && (
        <BottomTab.Screen
          name="More"
          component={OtherNavigator}
          options={{
            title: 'Еще',
            tabBarIcon: () => (
              <MenuSVGIcon width={iconSize.width} height={iconSize.height} />
            ),
          }}
        />
      )}
    </BottomTab.Navigator>
  );
}
