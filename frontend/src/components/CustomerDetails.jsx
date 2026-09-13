import React from 'react';
import Card from './Card';
import FormField from './FormField';

const CustomerDetails = () => {
    return (
        <Card title="Customer details" description="Who this invoice will be sent to.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField 
                id="customerName"
                name="billedTo.customerName" 
                label="Customer name" 
                placeholder="Aman Sharma"
                rules={{
                        required: "Customer name is required",
                        maxLength: {
                            value: 20,
                            message: "Customer name cannot exceed 20 characters",
                        },
                    }}
                 />
                <FormField
                id="customerEmail"
                label="Customer email"
                name="billedTo.customerEmail"
                type="email"
                placeholder="customer@example.com"
                rules={{
                        required: "Customer email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                        },
                    }}
                />
            </div>
        </Card>
    );
}

export default CustomerDetails;
