import { NodeProps } from 'reactflow';
import { NodeCard } from './NodeCard';
import { SourceRight, TargetLeft } from './handles';
import { Input } from '../common/Input';

export const DelayNode: React.FC<NodeProps<{ id: string; nodeType: 'delay'; ms?: number }>> = ({ id }) => {
  return (
    <NodeCard title="Delay">
      <TargetLeft id={`${id}-input`} />
      <Input label="Milliseconds" type="number" defaultValue={500} />
      <SourceRight id={`${id}-output`} />
    </NodeCard>
  );
};

