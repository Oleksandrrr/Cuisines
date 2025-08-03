/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {FC, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './navigators';

const App: FC = () => {
  useEffect(() => {
    // Скрываем нативный splash screen после загрузки приложения
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <RootNavigation />
    </SafeAreaProvider>
  );
};

export default App;
