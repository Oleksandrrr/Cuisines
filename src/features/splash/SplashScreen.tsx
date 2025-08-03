import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({onFinish}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // Показываем splash screen 3 секунды

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <LinearGradient
      colors={['#9933FF', '#33CCFF']}
      start={{x: 0, y: 1}} // Начинаем с нижнего левого угла
      end={{x: 1, y: 0}} // Заканчиваем в верхнем правом углу
      style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>RaisinEat</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default SplashScreen;
