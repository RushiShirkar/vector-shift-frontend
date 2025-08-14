import { ForwardedRef, forwardRef, SelectHTMLAttributes, useId } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const Select = forwardRef(function Select(
  { id, label, error, helperText, className, containerClassName, children, ...props }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const helperId = helperText ? `${selectId}-help` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={clsx('flex flex-col text-xs text-gray-700', containerClassName)}>
      {label && (
        <label className="mb-1" htmlFor={selectId}>
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={twMerge(
          'h-9 w-full mt-1 rounded-md border bg-white text-gray-900 text-sm px-2 pr-8 appearance-none',
          'border-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-500',
          error ? 'border-red-500 focus:ring-red-500' : '',
          className
        )}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        {...props}
      >
        {children}
      </select>
      {helperText && !error && (
        <span id={helperId} className="mt-1 text-[11px] text-gray-500">
          {helperText}
        </span>
      )}
      {error && (
        <span id={errorId} className="mt-1 text-[11px] text-red-600">
          {error}
        </span>
      )}
    </div>
  );
});