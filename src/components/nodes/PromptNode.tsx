import { NodeProps } from 'reactflow';
import { NodeCard, SourceRight, TargetLeft } from './shared';

export const PromptNode: React.FC<NodeProps<{ id: string; nodeType: 'prompt' }>> = ({ id }) => {
  return (
    <NodeCard title="Prompt" nodeId={id}>
      <TargetLeft id={`${id}-input`} />
      <div className="text-sm text-gray-600 dark:text-gray-300">Formats a prompt.</div>
      <SourceRight id={`${id}-output`} />
    </NodeCard>
  );
};

