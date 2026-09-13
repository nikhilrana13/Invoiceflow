import { Check } from 'lucide-react';
import React from 'react';

const SuccessState = ({invoiceId = "INV-00482"}) => {
  return (
      <div className="bg-white border border-line rounded-xl shadow-card p-8 sm:p-10 text-center max-w-md mx-auto">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-forest-500">
        <Check className="h-6 w-6 text-white" strokeWidth={2.5} />
      </div>

      <h2 className="text-lg font-semibold text-ink">Invoice is ready</h2>
      <p className="mt-2 text-sm text-ink-muted">
        Your invoice has been successfully generated and sent to the customer.
      </p>

      <div className="mt-6 border-t border-line pt-5 grid grid-cols-2 gap-4 text-left">
        <div>
          <span className="block text-xs text-ink-muted mb-1">Invoice ID</span>
          <span className="text-sm font-medium text-ink tabular">{invoiceId}</span>
        </div>
        <div>
          <span className="block text-xs text-ink-muted mb-1">Status</span>
          <span className="text-sm font-medium text-forest-600">Completed</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink hover:bg-canvas transition-colors focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2"
      >
        View invoice
      </button>
    </div>
  );
}

export default SuccessState;
