import { NodeProps } from 'reactflow';
import { NodeCard, SourceRight, TargetLeft } from './shared';
import { Input } from '../common/Input';
import { Clock3 } from 'lucide-react';

export const DelayNode: React.FC<NodeProps<{ id: string; nodeType: 'delay'; ms?: number }>> = ({ id }) => {
  return (
    <NodeCard 
      title="Delay" 
      icon={Clock3}
      description="Add a delay to your workflow"
      nodeId={id}
    >
      <TargetLeft id={`${id}-input`} />
      <Input label="Milliseconds" type="number" defaultValue={500} />
      <SourceRight id={`${id}-output`} />
    </NodeCard>
  );
};