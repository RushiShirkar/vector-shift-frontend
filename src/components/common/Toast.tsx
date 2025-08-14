import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

export const Toast: React.FC<{ message: ToastMessage; onClose: (id: number) => void; durationMs?: number }>
  = ({ message, onClose, durationMs = 3000 }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
      const timerId = setTimeout(() => {
        setOpen(false);
        onClose(message.id);
      }, durationMs);
      return () => clearTimeout(timerId);
    }, [message.id, onClose, durationMs]);

    if (!open) return null;

    const variant: ToastVariant = message.variant ?? 'info';
    const variantBarClass =
      variant === 'error'
        ? 'bg-red-500'
        : variant === 'success'
          ? 'bg-green-500'
          : 'bg-brand-500';
    const iconClass =
      variant === 'error'
        ? 'text-red-600'
        : variant === 'success'
          ? 'text-green-600'
          : 'text-brand-600';

    const Icon = variant === 'error' ? XCircle : variant === 'success' ? CheckCircle2 : Info;

    return (
      <div
        className={clsx(
          'pointer-events-auto w-80 max-w-[22rem] overflow-hidden rounded-lg bg-white text-gray-900',
          'shadow-lg ring-1 ring-black/5 border border-gray-200'
        )}
        role="alert"
      >
        <div className="flex">
          <div className={clsx('w-1', variantBarClass)} />
          <div className="flex w-full items-start gap-3 p-3">
            <div className="mt-0.5">
              <Icon className={clsx('h-5 w-5', iconClass)} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium leading-5">{message.title}</div>
              {message.description && (
                <div className="mt-0.5 text-xs leading-5 text-gray-600">{message.description}</div>
              )}
            </div>
            <button
              type="button"
              aria-label="Close notification"
              className="shrink-0 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
              onClick={() => { setOpen(false); onClose(message.id); }}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  };

export const ToastHost: React.FC<{ toasts: ToastMessage[]; onClose: (id: number) => void }>
  = ({ toasts, onClose }) => {
    return (
      <div className="pointer-events-none fixed bottom-4 right-4 z-[60] grid gap-2">
        {toasts.map((t) => (
          <Toast key={t.id} message={t} onClose={onClose} />
        ))}
      </div>
    );
  };