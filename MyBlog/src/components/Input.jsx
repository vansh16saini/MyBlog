import React, { useId } from 'react';

function Input(
  { 
    label, 
    type = 'text', 
    className = '', 
    ref,        // pull in the ref  
    ...props    // everything else  
  }
) {
  const id = useId();

  return (
  <div className="w-full space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-[var(--color-muted)]"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        ref={ref}
        {...props}
        className={`w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] text-[var(--color-text)] border border-white/10 outline-none transition-all duration-200 focus:border-[var(--color-primary)] placeholder:text-[var(--color-muted)] ${className}`}
      />
  </div>
  );
}

export default Input;
