import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import { Maximize2, Minimize2, XCircle } from 'lucide-react';
import { useStore } from '../../../redux/store';
import { Button } from '../../common/Button';
import { SourceRight, TargetLeft } from './handles';

interface NodeCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showOutputsIndicator?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  rightActions?: ReactNode;
  nodeId?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export const NodeCard: React.FC<NodeCardProps> = ({
  title,
  children,
  className,
  style,
  showOutputsIndicator = true,
  icon: Icon,
  description,
  rightActions,
  nodeId,
  collapsible = true,
  defaultCollapsed = false,
}) => {
  const removeNode = useStore((s) => s.removeNode);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(!!defaultCollapsed);

  const defaultActions = (
    <div className="flex items-center gap-1.5 text-brand-700">
      {collapsible ? (
        <Button
          variant="ghost"
          aria-label={isCollapsed ? 'Expand node' : 'Collapse node'}
          className="h-6 w-6 p-0 grid place-items-center hover:bg-brand-100"
          onClick={() => setIsCollapsed((v) => !v)}
        >
          {isCollapsed ? (
            <Maximize2 className="w-3.5 h-3.5" />
          ) : (
            <Minimize2 className="w-3.5 h-3.5" />
          )}
        </Button>
      ) : null}
      {nodeId ? (
        <Button
          variant="ghost"
          aria-label="Delete node"
          className="h-6 w-6 p-0 grid place-items-center hover:bg-brand-100"
          onClick={() => removeNode(nodeId)}
        >
          <XCircle className="w-4 h-4" />
        </Button>
      ) : (
        <XCircle className="w-4 h-4 opacity-50" />
      )}
    </div>
  );

  // Split children into handles vs content so handles stay visible when collapsed
  const childArray = Array.isArray(children) ? children : [children];
  const handles = childArray.filter((child: any) => {
    if (!child || typeof child !== 'object') return false;
    const t = (child as any).type;
    return t === SourceRight || t === TargetLeft;
  });
  const content = childArray.filter((child) => !handles.includes(child as any));

  return (
    <div style={style} className={clsx('w-64 rounded-xl bg-white border border-brand-300 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden', className)}>
      <div className="px-3 py-2 bg-brand-50 border-b border-brand-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon ? <Icon className="w-4 h-4 text-brand-600" /> : null}
            <span className="text-sm font-semibold text-brand-700">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            {rightActions ?? (nodeId ? defaultActions : (showOutputsIndicator ? (
              <span className="text-[10px] text-brand-700 bg-brand-100 border border-brand-200 rounded-full px-2 py-0.5">Outputs</span>
            ) : null))}
          </div>
        </div>
        {description ? (
          <p className="mt-1 text-[11px] leading-4 text-slate-700">{description}</p>
        ) : null}
      </div>
      {/* Always render handles */}
      {handles}
      {/* Conditionally render body content */}
      {!isCollapsed ? (
        <div className="p-3 space-y-3">
          {content}
        </div>
      ) : null}
    </div>
  );
};