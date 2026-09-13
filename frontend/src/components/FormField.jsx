import React from 'react';
import { get, useFormContext } from 'react-hook-form';

const FormField = ({ id, label, name, type = "text", placeholder, defaultValue, className = "", rules }) => {
    const { register, formState: { errors } } = useFormContext()
    const error = get(errors, name);
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-ink-soft mb-1.5">
                {label}
            </label>
            <input id={id} name={name} type={type} placeholder={placeholder} defaultValue={defaultValue}
                className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 transition-colors focus:border-forest-500 focus:ring-1 focus:ring-forest-500"
                {...register(name, rules)}
            />
            {error && (
                <p className="mt-1.5 text-xs text-red-600">
                    {error.message}
                </p>
            )}
        </div>
    );
}

export default FormField;
