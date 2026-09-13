import React from 'react';

const FormField = ({id,label,type = "text",placeholder,defaultValue,className = "",}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-ink-soft mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 transition-colors focus:border-forest-500 focus:ring-1 focus:ring-forest-500"
      />
    </div>
  );
}

export default FormField;
