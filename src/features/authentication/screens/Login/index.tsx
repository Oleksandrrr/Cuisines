import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useLogin} from '../../hooks';

import InputRow from './InputRow';

const Login = () => {
  const styles = StyleSheet.create({
    flexOne: {},
    container: {},
    btn: {},
    txt: {},
  });
  const isDarkMode = useColorScheme() === 'dark';
  var password = '';
  var email = '';

  const {submit} = useLogin({email, password});

  function onChangePassword(newpass: string) {
    password = newpass;
  }

  function onChangeUsername(newemail: string) {
    email = newemail;
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <InputRow
            label="Email"
            value={email}
            onChangeText={onChangeUsername}
          />
          <InputRow
            label="Password"
            value={password}
            onChangeText={onChangePassword}
            secureTextEntry={true}
          />
          <TouchableOpacity
            onPress={function () {
              submit();
            }}
            style={styles.btn}>
            <Text style={styles.txt}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
