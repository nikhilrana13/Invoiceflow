import React from 'react';
import Card from './Card';
import FormField from './FormField';

const BusinessDetails = () => {

    return (
        <Card title="Business details" description="Shown at the top of every invoice you send.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                    id="businessName"
                    label="Business name"
                    name="businessName"
                    placeholder="Rana Web Solutions"
                    className="sm:col-span-2"
                    rules={{
                        required: "Business name is required",
                        minLength: {
                            value: 2,
                            message: "Business name must be at least 2 characters",
                        },
                        maxLength: {
                            value: 40,
                            message: "Business name cannot exceed 40 characters",
                        },
                    }}
                />
                <FormField
                    id="businessEmail"
                    label="Business email"
                    name="businessEmail"
                    type="email"
                    placeholder="hello@yourbusiness.com"
                    rules={{
                        required: "Business email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                        },
                    }}
                />
                <FormField
                    id="businessAddress"
                    label="Business address"
                    name="businessAddress"
                    placeholder="Sector 70, Mohali, Punjab"
                    rules={{
                        maxLength: {
                            value: 100,
                            message: "Business name cannot exceed 100 characters",
                        },
                    }}
                />
            </div>
        </Card>
    );
}

export default BusinessDetails;
