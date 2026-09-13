import React from 'react';

const Card = ({title, description, children, className = ""}) => {
  return (
    <section
      className={`bg-white border border-line rounded-xl shadow-card p-5 sm:p-6 ${className}`}
    >
      {(title || description) && (
        <div className="mb-5">
          {title && (
            <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-ink-muted">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export default Card;
