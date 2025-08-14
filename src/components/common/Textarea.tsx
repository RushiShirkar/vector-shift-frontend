import { forwardRef, TextareaHTMLAttributes, useEffect, useId, useRef } from 'react';
import clsx from 'clsx';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  autoGrow?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { id, label, error, helperText, className, containerClassName, autoGrow = true, value, ...props },
  ref
) {
  const autoId = useId();
  const textareaId = id ?? autoId;
  const helperId = helperText ? `${textareaId}-help` : undefined;
  const errorId = error ? `${textareaId}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;
  const internalRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-grow height based on content
  useEffect(() => {
    if (!autoGrow) return;
    const el = internalRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value, autoGrow]);

  return (
    <div className={clsx('flex flex-col text-xs text-gray-700 dark:text-gray-300', containerClassName)}>
      {label && (
        <label className="mb-1" htmlFor={textareaId}>
          {label}
        </label>
      )}
      <textarea
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as any).current = node;
        }}
        id={textareaId}
        className={clsx(
          'min-h-[2rem] rounded-md border bg-white dark:bg-gray-900 text-sm px-2 py-1 resize-none',
          'border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        value={value}
        {...props}
      />
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

