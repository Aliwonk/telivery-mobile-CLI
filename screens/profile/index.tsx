/* eslint-disable react/react-in-jsx-scope */
import {NavigationProp} from '@react-navigation/native';
import {Pressable, Text} from 'react-native';
import Layout from '../../components/Layout';
import {RootTabParamList} from '../../types/navigation';
// import OrderScreen from './OrdersScreen';

type PropsProfileScreen = {
  navigation: NavigationProp<RootTabParamList>;
};
const ProfileScreen: React.FC<PropsProfileScreen> = ({navigation}) => {
  return (
    <>
      <Layout />
      <Pressable
        onPress={() =>
          navigation.navigate('ProfileScreens', {
            screen: 'Orders',
          })
        }>
        <Text>Заказы</Text>
      </Pressable>
    </>
  );
};

export default ProfileScreen;
