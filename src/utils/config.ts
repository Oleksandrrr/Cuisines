import {API_CONFIG, UI_CONFIG, VALIDATION_CONFIG} from '../config';

/**
 * Utility functions for working with configuration
 */

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export const getTimeout = (): number => {
  return API_CONFIG.TIMEOUT;
};

export const getRetryAttempts = (): number => {
  return API_CONFIG.RETRY_ATTEMPTS;
};

export const getColor = (colorKey: keyof typeof UI_CONFIG.COLORS): string => {
  return UI_CONFIG.COLORS[colorKey];
};

export const getSpacing = (
  spacingKey: keyof typeof UI_CONFIG.SPACING,
): number => {
  return UI_CONFIG.SPACING[spacingKey];
};

export const getFontSize = (
  fontKey: keyof typeof UI_CONFIG.FONT_SIZES,
): number => {
  return UI_CONFIG.FONT_SIZES[fontKey];
};

export const getBorderRadius = (
  radiusKey: keyof typeof UI_CONFIG.BORDER_RADIUS,
): number => {
  return UI_CONFIG.BORDER_RADIUS[radiusKey];
};

export const getValidationRule = (ruleKey: keyof typeof VALIDATION_CONFIG) => {
  return VALIDATION_CONFIG[ruleKey];
};

/**
 * Environment-specific configuration helpers
 */
export const isDevelopment = (): boolean => {
  return __DEV__;
};

export const isProduction = (): boolean => {
  return !__DEV__;
};

/**
 * Feature flags (for future use)
 */
export const getFeatureFlag = (flag: string): boolean => {
  // In a real app, this would check against a feature flag service
  const flags: Record<string, boolean> = {
    'enable-analytics': isProduction(),
    'enable-debug-menu': isDevelopment(),
    'enable-beta-features': isDevelopment(),
  };

  return flags[flag] || false;
};

/**
 * API configuration helpers
 */
export const getApiHeaders = (): Record<string, string> => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'User-Agent': 'RaisinEat/1.0.0',
  };
};

export const getApiConfig = () => {
  return {
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    retryAttempts: API_CONFIG.RETRY_ATTEMPTS,
    headers: getApiHeaders(),
  };
};
