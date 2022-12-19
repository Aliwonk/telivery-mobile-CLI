import React from 'react';
import {
  TextInput,
  StyleSheet,
  KeyboardType,
  TextInputChangeEventData,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  Text,
  View,
} from 'react-native';

type PropsInput = {
  defaultValue: any;
  placeholder: string;
  textLabel: string;
  missValue: any;
  keyboardType?: KeyboardType;
  selectTextOnFocus?: boolean;
  onChangeText: (text: string) => void;
  onFocus?: (params: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChange?: (params: NativeSyntheticEvent<TextInputChangeEventData>) => void;
};

const Input: React.FC<PropsInput> = ({
  textLabel,
  placeholder,
  defaultValue,
  missValue,
  keyboardType,
  selectTextOnFocus,
  onChangeText,
  onFocus,
  onChange,
}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.labelInput}>
          <Text style={styles.textLabel}>{textLabel}</Text>
          {missValue && <Text style={styles.textRequired}>*</Text>}
        </View>
        <TextInput
          style={styles.input}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          defaultValue={defaultValue}
          selectTextOnFocus={selectTextOnFocus}
          onFocus={onFocus}
          onChange={onChange}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
  },
  labelInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  textLabel: {
    fontSize: 16,
  },
  textRequired: {
    color: 'red',
  },
  input: {
    width: '100%',
    height: 45,
    paddingLeft: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dcdcdc',
    fontSize: 16,
  },
});

export default Input;
