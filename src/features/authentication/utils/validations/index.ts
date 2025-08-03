import {VALIDATION_CONFIG, ERROR_MESSAGES} from '../../../../config';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.VALIDATION.EMAIL_REQUIRED,
    };
  }

  if (email.length < VALIDATION_CONFIG.EMAIL.MIN_LENGTH) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.VALIDATION.EMAIL_INVALID,
    };
  }

  if (email.length > VALIDATION_CONFIG.EMAIL.MAX_LENGTH) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.VALIDATION.EMAIL_INVALID,
    };
  }

  if (!VALIDATION_CONFIG.EMAIL.PATTERN.test(email)) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.VALIDATION.EMAIL_INVALID,
    };
  }

  return {isValid: true};
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password.trim()) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED,
    };
  }

  if (password.length < VALIDATION_CONFIG.PASSWORD.MIN_LENGTH) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_SHORT,
    };
  }

  if (password.length > VALIDATION_CONFIG.PASSWORD.MAX_LENGTH) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_SHORT,
    };
  }

  return {isValid: true};
};

export const validateLoginForm = (
  email: string,
  password: string,
): ValidationResult => {
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }

  return {isValid: true};
};
