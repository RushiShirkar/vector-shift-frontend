import { forwardRef, InputHTMLAttributes, useId, ReactNode } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, error, helperText, className, containerClassName, leftIcon, rightIcon, ...props },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helperId = helperText ? `${inputId}-help` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = clsx(helperId, errorId) || undefined;

  return (
    <div className={clsx('flex flex-col text-xs text-gray-700 dark:text-gray-300', containerClassName)}>
      {label && (
        <label className="mb-1" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute inset-y-0 left-2 flex items-center text-gray-400 pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={twMerge(
            'h-8 w-full rounded-md border bg-white dark:bg-gray-900 text-sm px-2',
            leftIcon ? 'pl-8' : '',
            rightIcon ? 'pr-8' : '',
            'border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-500',
            error ? 'border-red-500 focus:ring-red-500' : '',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />
        {rightIcon && (
          <span className="absolute inset-y-0 right-2 flex items-center text-gray-400 pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>
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

