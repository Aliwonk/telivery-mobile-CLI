import React, {FC} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Layout from '../../components/Layout';
import {window} from '../../constants';

type Order = {
  img: string;
  nameGood: string;
  price: number;
  count: number;
};

interface PropsGoodComponent {
  data: Order[];
}

const dataCart: Array<Order> = [
  {
    img: '',
    nameGood: 'Суши WOK',
    price: 250,
    count: 1,
  },
  {
    img: '',
    nameGood: 'Суши WOK2',
    price: 350,
    count: 1,
  },
];

const GoodComponent: FC<PropsGoodComponent> = ({data}) => {
  return (
    <>
      {data.map((value: any, index: number) => {
        return (
          <TouchableOpacity style={styles.order} key={index}>
            <View style={styles.orderImg}>
              <Text>{value.img}</Text>
            </View>
            <View style={styles.orderRight}>
              <View style={styles.orderInf}>
                <Text>{value.nameGood}</Text>
              </View>
              <View style={styles.orderBtns}>
                <Text>Удалить</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default function CartScreen() {
  return (
    <Layout>
      <View style={styles.container}>
        <ScrollView style={{width: '100%'}}>
          <GoodComponent data={dataCart} />
        </ScrollView>
        <View>
          <Text>Оформить</Text>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: 'auto',
    paddingLeft: 7,
    paddingRight: 7,
    marginTop: 10,
  },
  order: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 140,
    // borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  orderImg: {
    width: '30%',
    height: '100%',
    borderWidth: 1,
  },
  orderRight: {
    width: '70%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'red',
  },
  orderInf: {
    width: '100%',
    height: '60%',
    borderWidth: 1,
    borderColor: 'green',
  },
  orderBtns: {
    width: '100%',
    height: 'auto',
  },
});
