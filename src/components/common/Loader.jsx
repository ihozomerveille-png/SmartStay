import { Loader2, AlertCircle } from 'lucide-react'

export const Loader = ({ message = 'Loading...' }) => (
  <div className="flex items-center justify-center min-h-screen gap-2">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
    <span className="text-gray-600">{message}</span>
  </div>
)

export const ErrorState = ({ message = 'Something went wrong', onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
    <AlertCircle className="w-12 h-12 text-red-500" />
    <h2 className="text-2xl font-bold text-dark">Error</h2>
    <p className="text-gray-600 text-center max-w-md">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-6 py-2 mt-4 bg-primary text-white rounded-lg hover:opacity-90 transition-all"
      >
        Try Again
      </button>
    )}
  </div>
)

export const EmptyState = ({ message = 'No listings found' }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-2">
    <p className="text-gray-600 text-lg">{message}</p>
  </div>
)
