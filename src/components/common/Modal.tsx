import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

type Size = 'sm' | 'md' | 'lg';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: Size;
  className?: string;
}

const sizeClass: Record<Size, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, size = 'md', className }) => {
  if (!open) return null;
  return createPortal(
    <Fragment>
      <div className="fixed inset-0 z-[100] bg-black/40" onClick={onClose} aria-hidden="true" />
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div 
          className={clsx('w-full rounded-lg bg-white text-gray-900 shadow-xl', sizeClass[size], className)} 
          role="dialog" 
          aria-modal="true"
        >
          {title && (
            <div className="px-4 py-3 border-b border-gray-200 text-sm font-semibold">
              {title}
            </div>
          )}
          <div className="p-4">{children}</div>
        </div>
      </div>
    </Fragment>,
    document.body
  );
};