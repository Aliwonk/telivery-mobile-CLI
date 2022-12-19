import {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {RootStackParamList} from '../../types/navigation';
import {window} from '../../constants';
import {Notification} from '../../components/Notification';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import Input from '../../components/Input';
import {clearValueMessage, registerUser} from '../../redux/features/authSlice';

type PropsRegisterScreen = {
  navigation: NavigationProp<RootStackParamList>;
};

type Values = {
  firstName: string;
  lastName: string;
  patronymic: string;
  phone: string;
  email: string;
  password: string;
  repeatPass: string;
};
const RegisterScreen: React.FC<PropsRegisterScreen> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {isLoading, message, successAuth} = useAppSelector(state => state.auth);
  const [values, setValues] = useState<Values>({
    firstName: '',
    lastName: '',
    patronymic: '',
    phone: '',
    email: '',
    password: '',
    repeatPass: '',
  });
  const [hideNotif, setHideNotif] = useState<boolean>(true);
  const [missName, setMissName] = useState<boolean>(false);
  const [missPhone, setMissPhone] = useState<boolean>(false);
  const [missEmail, setMissEmail] = useState<boolean>(false);
  const [missPass, setMissPass] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Notification hide={hideNotif} text={message} />
      <Text style={styles.caption}>РЕГИСТРАЦИЯ</Text>
      <View style={styles.itemInputs}>
        <Input
          textLabel="Имя"
          missValue={missName}
          defaultValue={values.firstName}
          placeholder="Антон"
          onChangeText={firstName =>
            setValues(values => ({
              ...values,
              ...{firstName},
            }))
          }
          onFocus={() => {
            setHideNotif(true);
            dispatch(clearValueMessage());
          }}
          onChange={() => setMissName(false)}
        />
        <Input
          textLabel="Телефон"
          missValue={missPhone}
          defaultValue={values.phone}
          placeholder="+7"
          keyboardType="phone-pad"
          onChangeText={phone =>
            setValues(values => ({
              ...values,
              ...{phone},
            }))
          }
          onFocus={() => {
            setHideNotif(true);
            dispatch(clearValueMessage());
          }}
          onChange={() => setMissPhone(false)}
        />
        <Input
          textLabel="Е-mail"
          missValue={missEmail}
          defaultValue={values.email}
          placeholder="example@mail.com"
          keyboardType="email-address"
          onChangeText={email =>
            setValues(values => ({
              ...values,
              ...{email},
            }))
          }
          onFocus={() => {
            setHideNotif(true);
            dispatch(clearValueMessage());
          }}
          onChange={() => setMissEmail(false)}
        />

        <Input
          textLabel="Пароль"
          missValue={missPass}
          defaultValue={values.password}
          placeholder="Пароль"
          keyboardType="default"
          onChangeText={password =>
            setValues(values => ({
              ...values,
              ...{password},
            }))
          }
          onFocus={() => {
            setHideNotif(true);
            dispatch(clearValueMessage());
          }}
          onChange={() => setMissPass(false)}
        />

        {/* button */}
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (
                values.firstName === '' &&
                values.phone === '' &&
                values.email === '' &&
                values.password === ''
              ) {
                setMissName(true);
                setMissPhone(true);
                setMissEmail(true);
                setMissPass(true);
              } else if (values.firstName === '') {
                setMissName(true);
              } else if (values.phone === '') {
                setMissPhone(true);
              } else if (values.email === '') {
                setMissEmail(true);
              } else if (values.password === '') {
                setMissPass(true);
              } else {
                dispatch(
                  registerUser({
                    ...values,
                  }),
                );
                setHideNotif(false);
              }
            }}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#00ff0" />
            ) : (
              <Text style={{color: 'white'}}>РЕГИСТРАЦИЯ</Text>
            )}
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
  caption: {
    fontSize: 24,
    letterSpacing: 1.5,
    marginBottom: 30,
    marginTop: -10,
    fontWeight: '400',
  },
  itemInputs: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    height: 'auto',
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 40,
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
});

export default RegisterScreen;
