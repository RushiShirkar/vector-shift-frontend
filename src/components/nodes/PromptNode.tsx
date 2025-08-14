import { NodeProps } from 'reactflow';
import { NodeCard } from './NodeCard';
import { SourceRight, TargetLeft } from './handles';

export const PromptNode: React.FC<NodeProps<{ id: string; nodeType: 'prompt' }>> = ({ id }) => {
  return (
    <NodeCard title="Prompt">
      <TargetLeft id={`${id}-input`} />
      <div className="text-sm text-gray-600 dark:text-gray-300">Formats a prompt.</div>
      <SourceRight id={`${id}-output`} />
    </NodeCard>
  );
};

