import React from 'react';
import Card from './Card';
import FormField from './FormField';

const BusinessDetails = () => {
  return (
    <Card title="Business details" description="Shown at the top of every invoice you send.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          id="business-name"
          label="Business name"
          placeholder="Rana Web Solutions"
          className="sm:col-span-2"
        />
        <FormField
          id="business-email"
          label="Business email"
          type="email"
          placeholder="hello@yourbusiness.com"
        />
        <FormField
          id="business-address"
          label="Business address"
          placeholder="Sector 70, Mohali, Punjab"
        />
      </div>
    </Card>
  );
}

export default BusinessDetails;
