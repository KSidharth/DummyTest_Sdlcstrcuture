
import type { ValidationResult } from '../types/form.types'

/**
 * Validates that a name field is non-empty and contains only alphabetic characters and spaces
 * Requirement: FR-001 - Name field validation
 */
export function validateName(value: string): ValidationResult {
  const trimmedValue = value.trim()

  if (trimmedValue.length === 0) {
    return {
      isValid: false,
      error: 'Name is required',
    }
  }

  // Accept alphabetic characters and spaces only
  const namePattern = /^[A-Za-z\s]+$/
  if (!namePattern.test(trimmedValue)) {
    return {
      isValid: false,
      error: 'Name must contain only letters and spaces',
    }
  }

  return {
    isValid: true,
  }
}

/**
 * Validates that a username field is non-empty and contains alphanumeric characters and common special characters
 * Requirement: FR-002 - Username field validation
 */
export function validateUsername(value: string): ValidationResult {
  const trimmedValue = value.trim()

  if (trimmedValue.length === 0) {
    return {
      isValid: false,
      error: 'Username is required',
    }
  }

  // Accept alphanumeric characters, underscores, and hyphens
  const usernamePattern = /^[A-Za-z0-9_-]+$/
  if (!usernamePattern.test(trimmedValue)) {
    return {
      isValid: false,
      error: 'Username can only contain letters, numbers, underscores, and hyphens',
    }
  }

  return {
    isValid: true,
  }
}

/**
 * Validates that an email field is non-empty and conforms to standard RFC email format
 * Requirement: FR-003 - Email ID field validation
 */
export function validateEmail(value: string): ValidationResult {
  const trimmedValue = value.trim()

  if (trimmedValue.length === 0) {
    return {
      isValid: false,
      error: 'Email ID is required',
    }
  }

  // RFC-compliant email regex pattern
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailPattern.test(trimmedValue)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address',
    }
  }

  return {
    isValid: true,
  }
}

/**
 * Validates that a password field is non-empty
 * Requirement: FR-004 - Password field validation
 * Note: Password masking is handled by input type="password" in the DOM
 */
export function validatePassword(value: string): ValidationResult {
  if (value.length === 0) {
    return {
      isValid: false,
      error: 'Password is required',
    }
  }

  return {
    isValid: true,
  }
}

/**
 * Validates all form fields and returns aggregated results
 * Requirement: FR-007 - Form validation on login submission
 */
export function validateAllFields(data: {
  name: string
  username: string
  email: string
  password: string
}): {
  isValid: boolean
  errors: {
    name?: string
    username?: string
    email?: string
    password?: string
  }
} {
  const nameResult = validateName(data.name)
  const usernameResult = validateUsername(data.username)
  const emailResult = validateEmail(data.email)
  const passwordResult = validatePassword(data.password)

  const errors: {
    name?: string
    username?: string
    email?: string
    password?: string
  } = {}

  if (!nameResult.isValid) {
    errors.name = nameResult.error
  }
  if (!usernameResult.isValid) {
    errors.username = usernameResult.error
  }
  if (!emailResult.isValid) {
    errors.email = emailResult.error
  }
  if (!passwordResult.isValid) {
    errors.password = passwordResult.error
  }

  const isValid = Object.keys(errors).length === 0

  return {
    isValid,
    errors,
  }
}
