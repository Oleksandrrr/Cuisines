import {selectors} from '../selectors';

// Mock the RootState
const mockRootState = {
  cuisine: {
    cuisines: [
      {
        id: '1',
        name: 'Chinese',
        imageUrl: 'https://example.com/chinese.jpg',
        description: 'Delicious Chinese cuisine',
      },
      {
        id: '2',
        name: 'Italian',
        imageUrl: 'https://example.com/italian.jpg',
        description: 'Authentic Italian dishes',
      },
    ],
    isLoading: false,
    error: null,
  },
};

describe('Cuisine Selectors', () => {
  describe('selectCuisines', () => {
    it('should return cuisines from state', () => {
      const result = selectors.selectCuisines(mockRootState as any);

      expect(result).toEqual(mockRootState.cuisine.cuisines);
      expect(result).toHaveLength(2);
    });
  });

  describe('selectCuisineLoading', () => {
    it('should return loading state', () => {
      const result = selectors.selectCuisineLoading(mockRootState as any);

      expect(result).toBe(false);
    });
  });

  describe('selectCuisineError', () => {
    it('should return error state', () => {
      const result = selectors.selectCuisineError(mockRootState as any);

      expect(result).toBe(null);
    });

    it('should return error when present', () => {
      const stateWithError = {
        cuisine: {
          ...mockRootState.cuisine,
          error: 'Network error',
        },
      };

      const result = selectors.selectCuisineError(stateWithError as any);

      expect(result).toBe('Network error');
    });
  });
});
