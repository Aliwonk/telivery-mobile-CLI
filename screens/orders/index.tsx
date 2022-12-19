import {StyleSheet, Text, View} from 'react-native';
import Layout from '../../components/Layout';

export default function OrdersScreen() {
  return (
    <>
      <Layout />
      <View style={styles.ordersBlock}>
        <Text style={styles.textOrders}>Orders</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ordersBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textOrders: {
    fontSize: 25,
    color: 'blue',
  },
});
