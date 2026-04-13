
import { forwardRef, InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  fieldId: string
}

/**
 * Reusable form field component with label, input, and error message
 * Requirements: FR-001, FR-002, FR-003, FR-004, NFR-005
 * - Displays labeled input fields
 * - Shows field-level error messages
 * - Supports all HTML input attributes
 * - Accessible with ARIA labels and descriptions
 */
const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, fieldId, type = 'text', className = '', ...props }, ref) => {
    const inputId = `input-${fieldId}`
    const errorId = `error-${fieldId}`
    const hasError = Boolean(error)

    return (
      <div className="w-full">
        <label htmlFor={inputId} className="form-label">
          {label}
          <span className="sr-only">{props.required ? ' (required)' : ' (optional)'}</span>
        </label>
        <input
          ref={ref}
          id={inputId}
          type={type}
          aria-label={label}
          aria-required={props.required}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={`input-field ${hasError ? 'input-field-error' : ''} ${className}`}
          {...props}
        />
        {hasError && (
          <div
            id={errorId}
            className="error-message"
            role="alert"
            aria-live="polite"
            aria-atomic="true"
          >
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'

export default FormField
