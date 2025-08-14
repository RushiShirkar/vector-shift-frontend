import { NodeProps } from 'reactflow';
import { NodeCard } from './NodeCard';
import { SourceRight, TargetLeft } from './handles';
import { Input } from '../common/Input';

export const IfNode: React.FC<NodeProps<{ id: string; nodeType: 'if' }>> = ({ id }) => {
  return (
    <NodeCard title="If">
      <TargetLeft id={`${id}-cond`} />
      <Input label="Condition (JS)" placeholder="x > 0" />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-xs mb-1">True</div>
          <SourceRight id={`${id}-true`} />
        </div>
        <div>
          <div className="text-xs mb-1">False</div>
          <SourceRight id={`${id}-false`} />
        </div>
      </div>
    </NodeCard>
  );
};

