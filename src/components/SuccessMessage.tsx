
interface SuccessMessageProps {
  message: string
}

/**
 * Success message component displayed after successful form validation
 * Requirement: FR-006 - Show login successful message
 * Requirement: NFR-005 - Visually distinct success styling
 * Requirement: NFR-003 - Accessible with ARIA live region
 */
function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div
      className="success-message animate-slide-in"
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center justify-center gap-2">
        <svg
          className="w-6 h-6 text-success-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  )
}

export default SuccessMessage
