import { NodeProps } from 'reactflow';
import { NodeCard } from './NodeCard';
import { SourceRight, TargetLeft } from './handles';
import { LlmNodeData } from '../../types/nodes';

export const LLMNode: React.FC<NodeProps<LlmNodeData>> = ({ id }) => {
  return (
    <NodeCard title="LLM">
      <TargetLeft id={`${id}-system`} topPct={100 / 3} />
      <TargetLeft id={`${id}-prompt`} topPct={(200 / 3)} />
      <div className="text-sm text-gray-600 dark:text-gray-300">This is an LLM.</div>
      <SourceRight id={`${id}-response`} />
    </NodeCard>
  );
};

