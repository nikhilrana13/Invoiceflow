import { ArrowRight } from 'lucide-react';
import React from 'react';

const GenerateInvoiceButton = () => {
  return (
     <button type="button" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-forest-500 px-4 py-3 text-sm font-medium text-white shadow-card transition-colors hover:bg-forest-600 focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      Generate invoice
      <ArrowRight className="h-4 w-4" strokeWidth={2} />
    </button>
  );
}

export default GenerateInvoiceButton;
