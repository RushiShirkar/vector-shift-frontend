import clsx from 'clsx';
import { ReactNode } from 'react';

interface NodeCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const NodeCard: React.FC<NodeCardProps> = ({ title, children, className, style }) => {
  return (
    <div style={style} className={clsx('w-64 border border-gray-200 rounded-xl bg-white shadow-sm', className)}>
      <div className="px-3 py-2 border-b border-gray-100 text-sm font-semibold text-gray-800 flex items-center justify-between">
        <span>{title}</span>
        <span className="text-[10px] text-gray-400">Outputs</span>
      </div>
      <div className="p-3 space-y-3">
        {children}
      </div>
    </div>
  );
};

