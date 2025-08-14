import { NodeProps } from 'reactflow';
import { NodeCard, SourceRight, TargetLeft } from './shared';
import { LlmNodeData } from '../../types/nodes';
import { Bot } from 'lucide-react';

export const LLMNode: React.FC<NodeProps<LlmNodeData>> = ({ id }) => {
  return (
    <NodeCard 
      title="LLM"
      icon={Bot}
      description="Generate text, images, or code using AI"
      nodeId={id}
    >
      <TargetLeft id={`${id}-system`} topPct={100 / 3} />
      <TargetLeft id={`${id}-prompt`} topPct={(200 / 3)} />
      <div className="text-sm text-gray-600 dark:text-gray-300">This is an LLM.</div>
      <SourceRight id={`${id}-response`} />
    </NodeCard>
  );
};