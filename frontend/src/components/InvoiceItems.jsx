import { Plus } from 'lucide-react';
import React from 'react';
import FormField from './FormField';
import Card from './Card';
import InvoiceitemRow from './InvoiceitemRow';
import { useFieldArray, useFormContext } from 'react-hook-form';


const InvoiceItems = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });
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
                {fields?.map((item, index) => (
                    <InvoiceitemRow
                        key={item.id}
                        index={index}
                        item={item}
                        remove={remove}
                    />
                ))}
            </div>
            <button
                type="button"
                onClick={()=>append({
                    name:"",
                    quantity:1,
                    price:0
                })}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-forest-600 hover:text-forest-700 transition-colors rounded-md px-1 py-1">
                <Plus className="h-4 w-4" strokeWidth={2} />
                Add item
            </button>
            <div className="mt-6 pt-6 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-4 sm:max-w-sm sm:ml-auto">
                <FormField id="tax" label="Tax" placeholder="₹500" name="tax" rules={{
                    valueAsNumber: true,
                    min: {
                        value: 0,
                        message: "Tax price cannot be negative",
                    },
                }} />
                <FormField id="discount" label="Discount" placeholder="₹1,000" name="discount" type='number' rules={{
                    valueAsNumber: true,
                        min: {
                            value: 0,
                            message: "Discount price cannot be negative",
                        },
                }} />
            </div>
        </Card>
    );
}

export default InvoiceItems;
