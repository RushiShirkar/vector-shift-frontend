import { useState } from 'react';
import { NodeProps } from 'reactflow';
import { NodeCard } from './NodeCard';
import { TargetLeft } from './handles';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { OutputNodeData } from '../../types/nodes';

export const OutputNode: React.FC<NodeProps<OutputNodeData>> = ({ id, data }) => {
  const [currName, setCurrName] = useState<string>(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState<OutputNodeData['outputType']>(data.outputType || 'Text');

  return (
    <NodeCard title="Output">
      <TargetLeft id={`${id}-value`} />
      <div className="space-y-2">
        <Input label="Name" aria-label="Output name" value={currName} onChange={(e) => setCurrName(e.target.value)} />
        <Select label="Type" aria-label="Output type" value={outputType} onChange={(e) => setOutputType(e.target.value as any)}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </Select>
      </div>
    </NodeCard>
  );
};

