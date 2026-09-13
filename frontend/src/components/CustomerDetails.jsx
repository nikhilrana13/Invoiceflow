import React from 'react';
import Card from './Card';
import FormField from './FormField';

const CustomerDetails = () => {
  return (
    <Card title="Customer details" description="Who this invoice will be sent to.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField id="customer-name" label="Customer name" placeholder="Aman Sharma" />
        <FormField
          id="customer-email"
          label="Customer email"
          type="email"
          placeholder="customer@example.com"
        />
      </div>
    </Card>
  );
}

export default CustomerDetails;
