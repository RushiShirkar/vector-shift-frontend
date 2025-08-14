import { NodeProps } from 'reactflow';
import { NodeCard } from './NodeCard';
import { SourceRight, TargetLeft } from './handles';
import { Select } from '../common/Select';

export const MathNode: React.FC<NodeProps<{ id: string; nodeType: 'math'; op?: string }>> = ({ id }) => {
  return (
    <NodeCard title="Math">
      <TargetLeft id={`${id}-a`} topPct={33} />
      <TargetLeft id={`${id}-b`} topPct={66} />
      <Select label="Operation" defaultValue={"add"}>
        <option value="add">Add</option>
        <option value="sub">Subtract</option>
        <option value="mul">Multiply</option>
      </Select>
      <SourceRight id={`${id}-result`} />
    </NodeCard>
  );
};

