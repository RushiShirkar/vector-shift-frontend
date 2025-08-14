import { useMemo, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { NodeCard, SourceRight } from './shared';
import { Textarea } from '../common/Textarea';
import { TextNodeData } from '../../types/nodes';
import { MessageSquare } from 'lucide-react';

export const TextNode: React.FC<NodeProps<TextNodeData>> = ({ id, data }) => {
  const [currText, setCurrText] = useState<string>(data?.text || '{{input}}');
  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][\w$]*)\s*\}\}/g;
    const found = new Set<string>();
    let match: RegExpExecArray | null;
    while ((match = regex.exec(currText))) {
      found.add(match[1]);
    }
    return Array.from(found);
  }, [currText]);

  return (
    <NodeCard 
      title="Text" 
      style={{ width: Math.min(250, 200 + Math.floor(currText.length / 15) * 20) }}
      icon={MessageSquare}
      description="Generate text, images, or code using AI"
      nodeId={id}
    >
      <Textarea
        label="Text"
        aria-label="Text value"
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
      />
      <SourceRight id={`${id}-output`} />
      {variables.map((variable, idx) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-var-${variable}`}
          style={{ top: `${(idx + 1) * 25}%` }}
        />
      ))}
    </NodeCard>
  );
};