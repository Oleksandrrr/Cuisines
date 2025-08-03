import {describe, it, expect} from '@jest/globals';
import {selectors} from '../selectors';

const mockState = {
  restaurant: {
    restaurants: [
      {
        id: '1',
        name: 'Restaurant 1',
        cuisineId: 'chinese',
        isOpen: true,
      },
      {
        id: '2',
        name: 'Restaurant 2',
        cuisineId: 'chinese',
        isOpen: false,
      },
      {
        id: '3',
        name: 'Restaurant 3',
        cuisineId: 'italian',
        isOpen: true,
      },
    ],
    selectedRestaurant: {
      id: '1',
      name: 'Restaurant 1',
      cuisineId: 'chinese',
      isOpen: true,
    },
    isLoading: false,
    error: null,
  },
};

describe('Restaurant Selectors', () => {
  describe('selectRestaurants', () => {
    it('should filter restaurants by cuisineId', () => {
      const result = selectors.selectRestaurants(mockState as any, 'chinese');
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Restaurant 1');
      expect(result[1].name).toBe('Restaurant 2');
    });

    it('should sort restaurants by open status (open first)', () => {
      const result = selectors.selectRestaurants(mockState as any, 'chinese');
      expect(result[0].isOpen).toBe(true);
      expect(result[1].isOpen).toBe(false);
    });

    it('should return empty array for non-existent cuisineId', () => {
      const result = selectors.selectRestaurants(
        mockState as any,
        'nonexistent',
      );
      expect(result).toHaveLength(0);
    });
  });

  describe('selectRestaurantLoading', () => {
    it('should return loading state', () => {
      const result = selectors.selectRestaurantLoading(mockState as any);
      expect(result).toBe(false);
    });
  });

  describe('selectRestaurantError', () => {
    it('should return error state', () => {
      const result = selectors.selectRestaurantError(mockState as any);
      expect(result).toBe(null);
    });
  });

  describe('selectSelectedRestaurant', () => {
    it('should return selected restaurant', () => {
      const result = selectors.selectSelectedRestaurant(mockState as any);
      expect(result).toEqual(mockState.restaurant.selectedRestaurant);
    });
  });
});
