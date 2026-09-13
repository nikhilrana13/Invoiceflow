import React from 'react'
import GenerateInvoiceButton from './GenerateInvoiceButton'
import { useFormContext } from 'react-hook-form';


const InvoiceSummary = () => {
  const { watch } = useFormContext();
  const items = watch("items") || [];
  const tax = Number(watch("tax")) || 0;
  const discount = Number(watch("discount")) || 0;
  // find subtotal   
  const subtotal = items.reduce((sum, item) => {
  const quantity = Number(item.quantity) || 0;
  const price = Number(item.price) || 0;
    return sum + quantity * price;
  }, 0);

  const total = Math.max(0, subtotal + tax - discount);

  const formatCurrency = (value) =>
    `₹${value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const lines = [
    {
      label: "Subtotal",
      value: formatCurrency(subtotal),
    },
    {
      label: "Tax",
      value: formatCurrency(tax),
    },
    {
      label: "Discount",
      value: `-${formatCurrency(discount)}`,
    },
  ];
  return (
      <aside className="bg-white border border-line rounded-xl shadow-elevated p-6">
      <h2 className="text-[15px] font-semibold text-ink mb-5">Invoice summary</h2>

      <dl className="space-y-3">
        {lines.map((line) => (
          <div key={line.label} className="flex items-center justify-between text-sm">
            <dt className="text-ink-muted">{line.label}</dt>
            <dd className="text-ink-soft tabular">{line.value}</dd>
          </div>
        ))}
      </dl>

      <div className="my-5 border-t border-line" />

      <div className="flex items-end justify-between">
        <span className="text-sm font-medium text-ink-soft">Total</span>
        <span className="text-2xl font-semibold text-ink tabular tracking-tight">
          {formatCurrency(total)}
        </span>
      </div>

      <div className="mt-6">
        <GenerateInvoiceButton />
      </div>

      <p className="mt-3 text-xs text-ink-muted text-center">
        The customer will receive this invoice by email once generated.
      </p>
    </aside>
  )
}

export default InvoiceSummary
