import {FetchCuisinesData} from './types';

const API_BASE_URL = 'https://rc-code-challenge.netlify.app/api/v1';
const CUISINES_ENDPOINT = `${API_BASE_URL}/cuisines`;

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchCuisines(): Promise<FetchCuisinesData> {
  try {
    const response = await fetch(CUISINES_ENDPOINT);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || 'Failed to fetch cuisines',
        response.status,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error occurred while fetching cuisines');
  }
}
