import {API_CONFIG, ERROR_MESSAGES} from '../../../../config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: any;
  token: string;
}

export interface ServerLoginResponse {
  message: string;
  userId: number;
}

export class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const LOGIN_ENDPOINT = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`;

export const login = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
        response.status,
      );
    }

    const data: ServerLoginResponse = await response.json();

    // Transform server response to match our interface
    const transformedResponse: LoginResponse = {
      user: {
        id: data.userId,
        email: credentials.email,
      },
      token: `token-${data.userId}-${Date.now()}`,
    };

    return transformedResponse;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(ERROR_MESSAGES.NETWORK.TIMEOUT);
    }

    throw new ApiError(ERROR_MESSAGES.NETWORK.UNKNOWN);
  }
};
