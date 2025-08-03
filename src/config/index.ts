// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://rc-code-challenge.netlify.app/api/v1',
  ENDPOINTS: {
    LOGIN: '/login',
    CUISINES: '/cuisines',
  },
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: 'RaisinEat',
  VERSION: '1.0.0',
  BUILD_NUMBER: '1',
  ENVIRONMENT: __DEV__ ? 'development' : 'production',
} as const;

// Navigation Configuration
export const NAVIGATION_CONFIG = {
  ANIMATION_DURATION: 300,
  HEADER_HEIGHT: 56,
  TAB_BAR_HEIGHT: 49,
} as const;

// UI Configuration
export const UI_CONFIG = {
  COLORS: {
    PRIMARY: '#9933FF',
    SECONDARY: '#FF6B35',
    SUCCESS: '#4CAF50',
    ERROR: '#F44336',
    WARNING: '#FF9800',
    INFO: '#2196F3',
    BACKGROUND: '#F5F5F5',
    SURFACE: '#FFFFFF',
    TEXT: {
      PRIMARY: '#333333',
      SECONDARY: '#666666',
      DISABLED: '#999999',
    },
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
    XXL: 48,
  },
  BORDER_RADIUS: {
    SM: 4,
    MD: 8,
    LG: 12,
    XL: 16,
  },
  FONT_SIZES: {
    XS: 12,
    SM: 14,
    MD: 16,
    LG: 18,
    XL: 20,
    XXL: 24,
    TITLE: 28,
  },
} as const;

// Validation Configuration
export const VALIDATION_CONFIG = {
  EMAIL: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 254,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128,
  },
  RESTAURANT_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
} as const;

// Storage Configuration
export const STORAGE_CONFIG = {
  KEYS: {
    AUTH_TOKEN: 'raisin_eat_token',
    USER_DATA: 'raisin_eat_user_data',
    CREDENTIALS: 'raisin_eat_credentials',
    THEME: 'raisin_eat_theme',
    LANGUAGE: 'raisin_eat_language',
  },
  PERSIST_KEYS: {
    AUTH: 'auth',
    SETTINGS: 'settings',
  },
} as const;

// Image Configuration
export const IMAGE_CONFIG = {
  PLACEHOLDER: 'https://via.placeholder.com/300x200?text=No+Image',
  CUISINE_IMAGES: {
    CHINESE:
      'https://www.top10berlin.de/wp-content/uploads/2023/11/top10berlin_feedback002.jpg',
    INDIAN:
      'https://www.top10berlin.de/wp-content/uploads/2023/11/top10berlin_szene-fruehstueck_paulinski-palme001.jpg',
    ITALIAN:
      'https://www.top10berlin.de/wp-content/uploads/2023/11/top10berlin_chai-ji.jpg',
  },
  CACHE: {
    MAX_SIZE: 100 * 1024 * 1024, // 100MB
    TTL: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: {
    TIMEOUT: 'Request timeout. Please check your connection.',
    NO_INTERNET: 'No internet connection. Please try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNKNOWN: 'An unexpected error occurred.',
  },
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password.',
    SESSION_EXPIRED: 'Session expired. Please login again.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
  },
  VALIDATION: {
    EMAIL_REQUIRED: 'Email is required.',
    EMAIL_INVALID: 'Please enter a valid email address.',
    PASSWORD_REQUIRED: 'Password is required.',
    PASSWORD_TOO_SHORT: 'Password must be at least 6 characters.',
  },
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in!',
  LOGOUT: 'Successfully logged out!',
  DATA_LOADED: 'Data loaded successfully!',
} as const;

// Loading Messages
export const LOADING_MESSAGES = {
  LOGIN: 'Logging in...',
  LOADING_RESTAURANTS: 'Loading restaurants...',
  LOADING_CUISINES: 'Loading cuisines...',
  LOADING_DETAILS: 'Loading details...',
} as const;

// Default Values
export const DEFAULTS = {
  PAGINATION: {
    PAGE: 1,
    LIMIT: 20,
  },
  REFRESH: {
    TIMEOUT: 5000, // 5 seconds
  },
  ANIMATION: {
    DURATION: 300,
    DELAY: 100,
  },
} as const;
