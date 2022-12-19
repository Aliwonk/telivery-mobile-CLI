import {NavigationProp} from '@react-navigation/native';
import {View, Text} from 'react-native';
import Layout from '../../components/Layout';
import {OtherStackParamList} from '../../types/navigation';

type PropsOtherScreen = {
  navigation: NavigationProp<OtherStackParamList>;
};

const OtherScreen: React.FC<PropsOtherScreen> = ({navigation}) => {
  return (
    <>
      <Layout />
      <View>
        <Text>Other Screen</Text>
      </View>
    </>
  );
};

export default OtherScreen;
