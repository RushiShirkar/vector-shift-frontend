import { useState } from 'react';
import { NodeProps } from 'reactflow';
import { NodeCard, TargetLeft } from './shared';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Switch } from '../common/Switch';
import { OutputNodeData } from '../../types/nodes';
import { LogIn } from 'lucide-react';

export const OutputNode: React.FC<NodeProps<OutputNodeData>> = ({ id, data }) => {
  const [currName, setCurrName] = useState<string>(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState<OutputNodeData['outputType']>(data.outputType || 'Text');

  return (
    <NodeCard 
      title="Output" 
      icon={LogIn}
      description="Output data of different types from your workflow"
      nodeId={id}
    >
      <TargetLeft id={`${id}-value`} />
      <div className="space-y-3">
        <Input
          label=""
          aria-label="Output name"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          containerClassName="w-full"
          className="h-8 text-center mt-[-2px] bg-brand-50/60 border-brand-200"
          placeholder="output_1"
        />
        <div className="flex items-center justify-between">
          <Select 
            label="Type" 
            aria-label="Output type" 
            value={outputType} 
            onChange={(e) => setOutputType(e.target.value as any)}
            containerClassName="w-full"
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </Select>
        </div>
        <Input
          label="Output"
          aria-label="Output body"
          placeholder='Type "{{" to utilize variables'
          className="h-8"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">Format output</span>
          <Switch checked label="Yes" onChange={() => {}} />
        </div>
      </div>
    </NodeCard>
  );
};