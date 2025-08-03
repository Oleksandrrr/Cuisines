import {API_CONFIG, ERROR_MESSAGES} from '../../../../config';
import {Restaurant, FetchCuisinesData} from './fetchCuisines/types';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const CUISINES_ENDPOINT = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CUISINES}`;

export async function fetchCuisines(): Promise<FetchCuisinesData> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(CUISINES_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || ERROR_MESSAGES.NETWORK.SERVER_ERROR,
        response.status,
      );
    }

    const data: FetchCuisinesData = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(ERROR_MESSAGES.NETWORK.TIMEOUT);
    }

    throw new ApiError(ERROR_MESSAGES.NETWORK.UNKNOWN);
  }
}

export async function fetchRestaurants(
  cuisineId: string,
  pagination?: PaginationParams,
): Promise<Restaurant[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(CUISINES_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || ERROR_MESSAGES.NETWORK.SERVER_ERROR,
        response.status,
      );
    }

    const data: FetchCuisinesData = await response.json();
    const cuisineData = data[cuisineId as keyof FetchCuisinesData];

    if (!cuisineData) {
      throw new ApiError(`Cuisine ${cuisineId} not found`);
    }

    // Combine open and closed restaurants, marking them with isOpen property
    const allRestaurants: Restaurant[] = [
      ...cuisineData.open.map(restaurant => ({
        ...restaurant,
        isOpen: true,
        cuisineId,
      })),
      ...cuisineData.close.map(restaurant => ({
        ...restaurant,
        isOpen: false,
        cuisineId,
      })),
    ];

    // Apply pagination if provided
    if (pagination) {
      const {page, limit} = pagination;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      return allRestaurants.slice(startIndex, endIndex);
    }

    return allRestaurants;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(ERROR_MESSAGES.NETWORK.TIMEOUT);
    }

    throw new ApiError(ERROR_MESSAGES.NETWORK.UNKNOWN);
  }
}

export async function fetchRestaurantDetail(
  restaurantId: string,
): Promise<Restaurant> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(CUISINES_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || ERROR_MESSAGES.NETWORK.SERVER_ERROR,
        response.status,
      );
    }

    const data: FetchCuisinesData = await response.json();

    // Search through all cuisines for the restaurant
    for (const cuisineKey of Object.keys(data)) {
      const cuisineData = data[cuisineKey as keyof FetchCuisinesData];

      const openRestaurant = cuisineData.open.find(r => r.id === restaurantId);
      if (openRestaurant) {
        return {...openRestaurant, isOpen: true, cuisineId: cuisineKey};
      }

      const closedRestaurant = cuisineData.close.find(
        r => r.id === restaurantId,
      );
      if (closedRestaurant) {
        return {...closedRestaurant, isOpen: false, cuisineId: cuisineKey};
      }
    }

    throw new ApiError(`Restaurant ${restaurantId} not found`);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(ERROR_MESSAGES.NETWORK.TIMEOUT);
    }

    throw new ApiError(ERROR_MESSAGES.NETWORK.UNKNOWN);
  }
}
