import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import EnterSVGIcon from '../../assets/icons/Enter.svg';
import {clearValueMessage, loginUser} from '../../redux/features/authSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {Notification} from '../../components/Notification';
import {RootStackParamList} from '../../types/navigation';
import {window} from '../../constants';
import Input from '../../components/Input';
import {RootState} from '../../redux/store';

type PropsAuthScreen = {
  navigation: NavigationProp<RootStackParamList>;
};
export const AuthScreen: React.FC<PropsAuthScreen> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {isLoading, user, errorFetch, message, successAuth} = useAppSelector(
    (state: RootState) => state.auth,
  );
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [missPhone, setMissPhone] = useState<boolean>(false);
  const [missPass, setMissPass] = useState<boolean>(false);
  const [hideNotif, setHideNotif] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <Notification hide={hideNotif} text={message} />
      <Text style={styles.caption}>АВТОРИЗАЦИЯ</Text>
      <View style={styles.itemInputs}>
        {/* input phone */}
        <Input
          textLabel="Телефон"
          keyboardType="phone-pad"
          placeholder="+7"
          missValue={missPhone}
          defaultValue={phone}
          onChangeText={phone => setPhone(phone)}
          onFocus={() => {
            setHideNotif(true);
            dispatch(clearValueMessage());
          }}
          onChange={() => setMissPhone(false)}
        />

        {/* input password */}
        <Input
          textLabel="Пароль"
          placeholder="Введите пароль"
          missValue={missPass}
          defaultValue={password}
          onChangeText={password => setPassword(password)}
          onFocus={() => {
            setHideNotif(true);
            dispatch(clearValueMessage());
          }}
          onChange={() => setMissPass(false)}
        />

        {/* button */}
        <View style={styles.btns}>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => {
              if (phone === '' && password === '') {
                setMissPhone(true);
                setMissPass(true);
              } else if (password === '') {
                setMissPass(true);
              } else if (phone === '') {
                setMissPhone(true);
              } else {
                dispatch(loginUser({password, phone}));
                setHideNotif(false);
              }
            }}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#00ff0" />
            ) : (
              <EnterSVGIcon width={50} height={50} />
            )}
          </TouchableOpacity>

          {/* btn link screen register */}

          <TouchableOpacity
            style={styles.btnRegister}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.textBtnRegister}>ЗАРЕГИСТРИРОВАТЬСЯ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: window.width,
    height: window.height,
  },
  // icon: {
  //     width: 60,
  //     height: 60
  // },
  caption: {
    fontSize: 24,
    letterSpacing: 1.5,
    marginBottom: 70,
    marginTop: -60,
    fontWeight: '400',
  },
  itemInputs: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    height: 'auto',
  },
  btns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    marginTop: 10,
  },
  btnSubmit: {
    display: 'flex',
    alignItems: 'flex-start',
    width: 25,
    height: 27,
    borderRadius: 5,
  },
  btnRegister: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 27,
  },
  textBtnRegister: {
    fontWeight: '300',
    color: 'blue',
    marginTop: 4,
  },
});

export default AuthScreen;
