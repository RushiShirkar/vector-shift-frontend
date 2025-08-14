import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', ...props },
  ref
) {
  const base = 'h-6 rounded-md px-2 text-xs';
  const styles: Record<Variant, string> = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-white focus-visible:ring-brand-500',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus-visible:ring-gray-400',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-900 focus-visible:ring-gray-300',
  };
  return (
    <button ref={ref} className={twMerge(clsx(base, styles[variant], className))} {...props} />
  );
});