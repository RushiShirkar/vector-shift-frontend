import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { className, label, checked, ...props },
  ref
) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      {label ? <span className="text-sm text-gray-800">{label}</span> : null}
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          className={twMerge(clsx('sr-only peer', className))}
          checked={!!checked}
          {...props}
        />
        <div className="w-9 h-5 bg-gray-300 rounded-full peer-checked:bg-brand-500 transition-colors"></div>
        <div 
          className="
            absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform 
            peer-checked:translate-x-4
          "
        ></div>
      </div>
    </label>
  );
});