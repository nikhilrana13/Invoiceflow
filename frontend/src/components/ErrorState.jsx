import { AlertTriangle } from 'lucide-react';
import React from 'react';

const ErrorState = () => {
  return (
    <div className="bg-white border border-line rounded-xl shadow-card p-8 sm:p-10 text-center max-w-md mx-auto">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
        <AlertTriangle className="h-6 w-6 text-red-600" strokeWidth={2} />
      </div>

      <h2 className="text-lg font-semibold text-ink">Something went wrong</h2>
      <p className="mt-2 text-sm text-ink-muted">
        We couldn't finish processing this invoice. Please try again.
      </p>

      <button
        type="button"
        className="mt-6 w-full rounded-lg bg-forest-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-forest-600 transition-colors focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2"
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorState;
