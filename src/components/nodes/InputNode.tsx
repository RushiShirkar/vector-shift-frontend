import { useState } from 'react';
import { NodeProps } from 'reactflow';
import { NodeCard } from './NodeCard';
import { SourceRight } from './handles';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { InputNodeData } from '../../types/nodes';

export const InputNode: React.FC<NodeProps<InputNodeData>> = ({ id, data }) => {
  const [currName, setCurrName] = useState<string>(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState<InputNodeData['inputType']>(data.inputType || 'Text');

  return (
    <NodeCard title="Input">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input 
            label="Name" 
            aria-label="Input name" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)} 
            containerClassName="w-full"
          />
        </div>
        <Select 
          label="Type" 
          aria-label="Input type" 
          value={inputType} 
          onChange={(e) => setInputType(e.target.value as any)}
          containerClassName="w-full"
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </Select>
      </div>
      <SourceRight id={`${id}-value`} />
    </NodeCard>
  );
};