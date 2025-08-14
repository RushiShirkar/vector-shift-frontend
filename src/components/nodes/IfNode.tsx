import { NodeProps } from 'reactflow';
import { NodeCard, SourceRight, TargetLeft } from './shared';
import { Input } from '../common/Input';

export const IfNode: React.FC<NodeProps<{ id: string; nodeType: 'if'; expression?: string }>> = ({ id }) => {
  return (
    <NodeCard title="Condition" showOutputsIndicator={false} nodeId={id}>
      <TargetLeft id={`${id}-input`} topPct={50} />
      <Input label="" placeholder="x > 0" />
      <div className="space-y-2">
        <div className="flex items-center justify-end pr-1">
          <span className="text-[11px] font-medium text-emerald-700">True</span>
        </div>
        <div className="flex items-center justify-end pr-1">
          <span className="text-[11px] font-medium text-rose-700">False</span>
        </div>
      </div>
      <SourceRight id={`${id}-true`} topPct={64} />
      <SourceRight id={`${id}-false`} topPct={80} />
    </NodeCard>
  );
};

