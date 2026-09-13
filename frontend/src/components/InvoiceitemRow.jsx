import { X } from 'lucide-react';
import React from 'react';


const MiniField = ({label,...props})=>{
    return (
    <div>
      <span className="block sm:hidden text-xs text-ink-muted mb-1">{label}</span>
      <input
        {...props}
        className="w-full rounded-md border border-line bg-white px-2.5 py-2 text-sm text-ink tabular focus:border-forest-500 focus:ring-1 focus:ring-forest-500"
      />
    </div>
    )
}
const InvoiceitemRow = ({item}) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-12 sm:items-center sm:gap-3 py-4 border-b border-line last:border-b-0">
      <div className="col-span-2 sm:col-span-5">
        <span className="block sm:hidden text-xs text-ink-muted mb-1">Item</span>
        <input
          type="text"
          defaultValue={item.name}
          placeholder="Website development"
          className="w-full rounded-md border border-line bg-white px-2.5 py-2 text-sm text-ink focus:border-forest-500 focus:ring-1 focus:ring-forest-500"
        />
      </div>

      <div className="col-span-1 sm:col-span-2">
        <MiniField
          label="Quantity"
          type="number"
          min="0"
          defaultValue={item.quantity}
        />
      </div>

      <div className="col-span-1 sm:col-span-2">
        <MiniField label="Price" type="text" defaultValue={item.price} />
      </div>

      <div className="col-span-2 sm:col-span-2 flex items-center justify-between sm:justify-start gap-3">
        <div className="w-full">
          <span className="block sm:hidden text-xs text-ink-muted mb-1">Amount</span>
          <div className="w-full rounded-md border border-line bg-canvas px-2.5 py-2 text-sm text-ink-soft tabular">
            {item.amount}
          </div>
        </div>
      </div>

      <div className="col-span-2 sm:col-span-1 flex sm:justify-end">
        <button
          type="button"
          aria-label={`Remove ${item.name || "item"}`}
          className="inline-flex items-center gap-1.5 sm:gap-0 text-sm text-ink-muted hover:text-ink transition-colors rounded-md px-2 py-1.5 -mx-2 sm:mx-0"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
          <span className="sm:hidden">Remove</span>
        </button>
      </div>
    </div>
  );
}

export default InvoiceitemRow;
