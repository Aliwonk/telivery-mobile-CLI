import {Dimensions, StyleSheet, Text, View} from 'react-native';

export default function Header() {
  return (
    <View style={style.header}>
      <Text style={style.logotype}>TELIVERY</Text>
      {/* <TouchableOpacity 
                // onPress={() => navigation.push('Profile')}
            >
                <ProfileSVGIcon width={30} height={30}/>
            </TouchableOpacity> */}
    </View>
  );
}

const style = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    height: 65,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 15,
    backgroundColor: '#fff',
  },
  logotype: {
    fontSize: 22.5,
    fontWeight: '600',
    letterSpacing: 3,
    color: 'black',
  },
});
