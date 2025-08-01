import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {InputRowProps} from './props';
import styles from './styles';

const InputRow = ({label, value, onChangeText, ...rest}: InputRowProps) => {
  return (
    <View style={styles.row}>
      <Text style={styles.lbl}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};

export default InputRow;
