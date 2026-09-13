import { Plus } from 'lucide-react';
import React from 'react';
import FormField from './FormField';
import Card from './Card';
import InvoiceitemRow from './InvoiceitemRow';


const MOCK_ITEMS = [
  { name: "Website Development", quantity: 1, price: "₹15,000", amount: "₹15,000" },
  { name: "Domain & Hosting", quantity: 1, price: "₹2,500", amount: "₹2,500" },
  { name: "Maintenance", quantity: 2, price: "₹1,000", amount: "₹2,000" },
];

const InvoiceItems = () => {
  return (
      <Card title="Invoice items" description="Add each product or service you're billing for.">
      <div className="hidden sm:grid grid-cols-12 gap-3 pb-3 text-xs font-medium text-ink-muted">
        <span className="col-span-5">Item</span>
        <span className="col-span-2">Quantity</span>
        <span className="col-span-2">Price</span>
        <span className="col-span-2">Amount</span>
        <span className="col-span-1" aria-hidden="true" />
      </div>

      <div className="sm:border-t border-line">
        {MOCK_ITEMS.map((item, index) => (
          <InvoiceitemRow key={index} item={item} />
        ))}
      </div>

      <button
        type="button"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-forest-600 hover:text-forest-700 transition-colors rounded-md px-1 py-1"
      >
        <Plus className="h-4 w-4" strokeWidth={2} />
        Add item
      </button>

      <div className="mt-6 pt-6 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-4 sm:max-w-sm sm:ml-auto">
        <FormField id="tax" label="Tax" placeholder="₹500" />
        <FormField id="discount" label="Discount" placeholder="₹1,000" />
      </div>
    </Card>
  );
}

export default InvoiceItems;
