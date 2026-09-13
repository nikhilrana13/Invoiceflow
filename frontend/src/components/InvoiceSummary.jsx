import React from 'react'
import GenerateInvoiceButton from './GenerateInvoiceButton'


const LINES = [
  { label: "Subtotal", value: "₹19,500.00" },
  { label: "Tax", value: "₹500.00" },
  { label: "Discount", value: "-₹1,000.00" },
];

const InvoiceSummary = () => {
  return (
      <aside className="bg-white border border-line rounded-xl shadow-elevated p-6">
      <h2 className="text-[15px] font-semibold text-ink mb-5">Invoice summary</h2>

      <dl className="space-y-3">
        {LINES.map((line) => (
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
          ₹19,000.00
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
