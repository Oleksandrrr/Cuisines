import {
  FetchCuisinesData,
  Cuisine,
} from '../../services/api/fetchCuisines/types';
import {IMAGE_CONFIG} from '../../../../config';

export const normalizeFetchCuisines = (_data: FetchCuisinesData): Cuisine[] => {
  const cuisines: Cuisine[] = [
    {
      id: 'chinese',
      name: 'Chinese',
      imageUrl: IMAGE_CONFIG.CUISINE_IMAGES.CHINESE,
      description: 'Traditional Chinese cuisine with authentic flavors',
    },
    {
      id: 'indian',
      name: 'Indian',
      imageUrl: IMAGE_CONFIG.CUISINE_IMAGES.INDIAN,
      description: 'Rich and diverse Indian culinary traditions',
    },
    {
      id: 'italian',
      name: 'Italian',
      imageUrl: IMAGE_CONFIG.CUISINE_IMAGES.ITALIAN,
      description: 'Classic Italian dishes with Mediterranean flair',
    },
  ];
  return cuisines;
};
