import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import StarSVGIcon from '../../../assets/icons/star.svg';

type dataItemStore = {
  id: number;
  name: string;
  img: string;
  description: string;
  workTime: string;
  rate: number;
};

type PropsItemStore = {
  data: Array<dataItemStore>;
};

type PropsItemStar = {
  countStar: number;
};

const ItemStar: React.FC<PropsItemStar> = (props: PropsItemStar) => {
  const {countStar} = props;
  const elementStars = [];
  const [colorStar, setColorStar] = useState<string>();

  useEffect(() => {
    switch (countStar) {
      case 1:
        setColorStar('#FF4500');
        break;
      case 2:
        setColorStar('#FF8C00');
        break;
      case 3:
        setColorStar('#FFD700');
        break;
      case 4:
        setColorStar('#2E8B57');
        break;
      case 5:
        setColorStar('#006400');
    }
  }, []);

  for (let i = 0; i < countStar; i++) {
    elementStars.push(
      <StarSVGIcon key={i} width={17} height={17} color={colorStar} />,
    );
  }
  return <React.Fragment>{elementStars}</React.Fragment>;
};

const ItemStore: React.FC<PropsItemStore> = (props: PropsItemStore) => {
  const {data} = props;
  const animOpacity = useRef(new Animated.Value(1)).current;
  const [animTranslateY, setAnimTranslateY] = useState<number>(0);
  const [animTranslateX, setAnimTranslateX] = useState<number>(0);
  const refStore = useRef();

  const fadeIn = () => {
    setAnimTranslateY(-10);
    setAnimTranslateX(-10);
    Animated.timing(animOpacity, {
      toValue: 0.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
    // Animated.timing(animTranslateY, {
    //     toValue: -10,
    //     duration: 100,
    //     useNativeDriver: true,
    // }).start();
  };
  const fadeOut = () => {
    setAnimTranslateY(0);
    setAnimTranslateX(0);
    Animated.timing(animOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    // Animated.timing(animTranslateY, {
    //     toValue: 0,
    //     duration: 100,
    //     useNativeDriver: true,
    // }).start();
  };

  const item = data.map((value: dataItemStore, index: number) => {
    return (
      <TouchableOpacity
        style={styles.itemStore}
        key={index}
        onPress={() => {
          console.log(value.id);
        }}>
        {/* <Animated.View
                    style={[styles.itemStore, {
                        opacity: animOpacity, transform: [{
                            translateY: animTranslateY
                        }]
                    }]}
                    ref={refStore}
                > */}
        <View style={styles.imageStore}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: '87%',
              height: '87%',
              borderRadius: 7,
            }}
            source={{
              uri: value.img,
            }}
          />
        </View>
        <View style={styles.infStore}>
          <View style={styles.textStore}>
            <Text style={styles.nameStore}>{value.name}</Text>
            <Text style={styles.descStore}>{value.description}</Text>
          </View>
          <View style={styles.rateStore}>
            <View style={styles.itemStar}>
              <ItemStar countStar={value.rate} />
            </View>
            <View style={styles.workTime}>
              <Text style={styles.time}>{value.workTime}</Text>
              <Text style={styles.decore}>*</Text>
            </View>
          </View>
        </View>
        {/* </Animated.View> */}
      </TouchableOpacity>
    );
  });
  return <React.Fragment>{item}</React.Fragment>;
};
export default ItemStore;

const styles = StyleSheet.create({
  itemStore: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 130,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.21,
    shadowRadius: 7.68,
    elevation: 6,
  },
  imageStore: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '38%',
    height: '100%',
    marginRight: 5,
    resizeMode: 'center',
  },
  infStore: {
    display: 'flex',
    // justifyContent: 'space-evenly',
    flexDirection: 'column',
    width: '63.5%',
    height: '100%',
    paddingTop: 7,
  },
  textStore: {
    display: 'flex',
    flexDirection: 'column',
  },
  nameStore: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 5,
    color: 'black',
  },
  descStore: {
    fontSize: 15,
    fontWeight: '300',
    height: '58%',
    color: 'black',
  },
  rateStore: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -5,
  },
  itemStar: {
    display: 'flex',
    flexDirection: 'row',
  },
  workTime: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  time: {
    marginRight: 5,
    color: 'black',
  },
  decore: {
    color: 'red',
  },
});
