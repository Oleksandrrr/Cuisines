import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Cuisine} from '../../../../services/api/fetchCuisines/types';
import {DashboardStackParamList} from '../../../../../../navigators/dashboard';

const {width} = Dimensions.get('window');

type CuisineListNavigationProp = NativeStackNavigationProp<
  DashboardStackParamList,
  'CuisineList'
>;

interface CuisineCellProps {
  cuisine: Cuisine;
}

const CuisineCell: React.FC<CuisineCellProps> = ({cuisine}) => {
  const navigation = useNavigation<CuisineListNavigationProp>();

  const handlePress = () => {
    navigation.navigate('RestaurantList', {
      cuisineId: cuisine.id,
      cuisineName: cuisine.name,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <ImageBackground
        source={{uri: cuisine.imageUrl}}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{cuisine.name}</Text>
          {cuisine.description && (
            <Text style={styles.description}>{cuisine.description}</Text>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backgroundImage: {
    width: width - 32,
    height: 200,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 12,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
});

export default CuisineCell;
