
/**
 * Form field validation state
 */
export interface FieldError {
  message: string
  type: 'required' | 'pattern' | 'custom'
}

/**
 * Login form data structure
 */
export interface LoginFormData {
  name: string
  username: string
  email: string
  password: string
}

/**
 * Field validation result
 */
export interface ValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Form submission state
 */
export type FormState = 'idle' | 'validating' | 'success' | 'error'

/**
 * Individual field state for DOM manipulation
 */
export interface FieldStateDto {
  value: string
  fieldId: string
}

/**
 * Validation pass result
 */
export interface ValidationPassResultDto {
  allFieldsValid: true
  timestamp: string
}

/**
 * Validation fail result with field-specific errors
 */
export interface ValidationFailResultDto {
  allFieldsValid: false
  errors: {
    nameError: string | null
    usernameError: string | null
    emailError: string | null
    passwordError: string | null
  }
  timestamp: string
}

/**
 * Success message rendering state
 */
export interface SuccessMessageRenderedState {
  message: string
  displayStyle: 'modal' | 'inline' | 'alert'
  isVisible: boolean
}

/**
 * Error rendering state
 */
export interface ErrorsRenderedState {
  hasErrors: boolean
  renderedFields: string[]
}

/**
 * Login form rendered state
 */
export interface LoginFormRenderedState {
  isRendered: boolean
  interactiveTimestamp: string
  loadTimeMs: number
}

/**
 * DOM render error state
 */
export interface DOMRenderErrorState {
  error: string
  component: string
}
