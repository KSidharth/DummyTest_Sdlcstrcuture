
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { LoginFormData } from '../types/form.types'
import { validateAllFields } from '../utils/validation'
import FormField from './FormField'
import SuccessMessage from './SuccessMessage'

/**
 * Main login form component
 * Requirements: All FR-001 through FR-007, NFR-003, NFR-004, NFR-005
 * - Renders all four input fields with labels
 * - Performs client-side validation on submission
 * - Displays field-level error messages
 * - Shows success message when all validations pass
 * - Fully accessible with keyboard navigation and ARIA labels
 */
function LoginForm() {
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  /**
   * Handle form submission
   * Requirement: FR-007 - Form validation on login submission
   * Requirement: FR-006 - Show login successful message
   */
  const onSubmit = (data: LoginFormData) => {
    // Clear any existing success message and errors
    setShowSuccess(false)
    clearErrors()

    // Perform comprehensive validation
    const validationResult = validateAllFields(data)

    if (!validationResult.isValid) {
      // Set field-level errors from validation result
      if (validationResult.errors.name) {
        setError('name', {
          type: 'custom',
          message: validationResult.errors.name,
        })
      }
      if (validationResult.errors.username) {
        setError('username', {
          type: 'custom',
          message: validationResult.errors.username,
        })
      }
      if (validationResult.errors.email) {
        setError('email', {
          type: 'custom',
          message: validationResult.errors.email,
        })
      }
      if (validationResult.errors.password) {
        setError('password', {
          type: 'custom',
          message: validationResult.errors.password,
        })
      }
      return
    }

    // All validations passed - show success message
    setShowSuccess(true)

    // Note: NFR-004 compliance - password is never logged or exposed
    // The password value remains in the form state only and is masked in the DOM
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Login form">
        <div className="space-y-5">
          {/* Name Field - FR-001 */}
          <FormField
            label="Name"
            fieldId="name"
            placeholder="Enter your full name"
            error={errors.name?.message}
            required
            autoComplete="name"
            {...register('name', {
              required: 'Name is required',
            })}
          />

          {/* Username Field - FR-002 */}
          <FormField
            label="Username"
            fieldId="username"
            placeholder="Enter your username"
            error={errors.username?.message}
            required
            autoComplete="username"
            {...register('username', {
              required: 'Username is required',
            })}
          />

          {/* Email ID Field - FR-003 */}
          <FormField
            label="Email ID"
            fieldId="email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            required
            autoComplete="email"
            {...register('email', {
              required: 'Email ID is required',
            })}
          />

          {/* Password Field - FR-004, NFR-004 */}
          <FormField
            label="Password"
            fieldId="password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            required
            autoComplete="current-password"
            {...register('password', {
              required: 'Password is required',
            })}
          />

          {/* Login Button - FR-005 */}
          <button
            type="submit"
            className="w-full btn btn-primary mt-6"
            aria-label="Submit login form"
          >
            Login
          </button>

          {/* Success Message - FR-006 */}
          {showSuccess && <SuccessMessage message="Login Successful" />}
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>This is a client-side prototype with no backend integration.</p>
      </div>
    </div>
  )
}

export default LoginForm
