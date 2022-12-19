import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Layout from '../../components/Layout';
import {RootStackParamList} from '../../types/navigation';
import ItemStore from './listStore/ListStore';
// import SearchBar from '../../components/SearchBar';

type PropsHomeScreen = {
  navigation: NavigationProp<RootStackParamList>;
};

const HomeScreen: React.FC<PropsHomeScreen> = ({navigation}) => {
  const dataStore = [
    {
      id: 1,
      name: 'DODO PIZZA',
      img: 'https://img.freepik.com/free-vector/flying-slice-pizza-cartoon-vector-illustration-fast-food-concept-isolated-vector-flat-cartoon-style_138676-1934.jpg',
      description: 'Гастрономические вкусные пицца только у нас',
      workTime: '8:00-23:00',
      rate: 3,
    },
    {
      id: 2,
      name: 'PIZZA RUST',
      img: 'https://img.freepik.com/vector-premium/dibujado-mano-pizza_215696-131.jpg',
      description:
        'Пицца - двигатель прогресса, и мы двигаем просгресс с помощью вкусной пиццы',
      workTime: '8:00-23:00',
      rate: 4,
    },
    {
      id: 3,
      name: 'RESPUBLICA',
      img: 'https://cdn.w600.comps.canstockphoto.es/dise%C3%B1o-de-pizza-imagen_csp15804575.jpg',
      description: 'Вкусные пиццы в нашем семейном птццерии.',
      workTime: '8:00-23:00',
      rate: 5,
    },
    {
      id: 4,
      name: 'SPEED PIZZA',
      img: 'https://img.freepik.com/vector-premium/ilustracion-dibujos-animados-rebanada-pizza_138676-1499.jpg',
      description: 'Гастрономические вкусные пицца только у нас',
      workTime: '8:00-23:00',
      rate: 2,
    },
    {
      id: 5,
      name: 'SPEED PIZZA',
      img: 'https://img.freepik.com/vector-premium/ilustracion-dibujos-animados-rebanada-pizza_138676-1499.jpg',
      description: 'Гастрономические вкусные пицца только у нас',
      workTime: '8:00-23:00',
      rate: 1,
    },
  ];

  return (
    <>
      <Layout>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.banner}>
              <Text style={styles.title}>РЕКЛАМА</Text>
            </View>
            {/* <SearchBar /> */}
            <Text style={styles.caption}>МАГАЗИНЫ</Text>
            <ItemStore data={dataStore} />
          </ScrollView>
        </View>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'white',
  },
  banner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 170,
    marginTop: 20,
    backgroundColor: 'black',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 17,
    },
    shadowOpacity: 0.25,
    shadowRadius: 18.97,
    elevation: 23,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: 'white',
  },
  caption: {
    fontSize: 18,
    fontWeight: '400',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 1,
    color: 'black',
  },
  itemStore: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 100,
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
  },
  imageStore: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    marginRight: 5,
    resizeMode: 'center',
  },
  infStore: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    width: '63.5%',
    padding: 5,
  },
  nameStore: {
    fontSize: 16,
    fontWeight: '500',
  },
  descStore: {
    fontSize: 15,
    fontWeight: '300',
  },
});

export default HomeScreen;
