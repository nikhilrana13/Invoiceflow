import { Loader2 } from 'lucide-react';
import React from 'react';

const ProcessingState = ({invoiceId = "INV-004821"}) => {
  return (
     <div role="status"  className="bg-white border border-line rounded-xl shadow-card p-8 sm:p-10 text-center max-w-md mx-auto">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-forest-50">
        <Loader2 className="h-6 w-6 text-forest-500 animate-spin" strokeWidth={2} />
      </div>

      <h2 className="text-lg font-semibold text-ink">
        Your invoice is being processed
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        We're generating your PDF and preparing it for delivery.
      </p>

      <div className="mt-6 border-t border-line pt-5 grid grid-cols-2 gap-4 text-left">
        <div>
          <span className="block text-xs text-ink-muted mb-1">Status</span>
          <span className="text-sm font-medium text-ink">Processing</span>
        </div>
        <div>
          <span className="block text-xs text-ink-muted mb-1">Invoice ID</span>
          <span className="text-sm font-medium text-ink tabular">{invoiceId}</span>
        </div>
      </div>
    </div>
  );
}

export default ProcessingState;
