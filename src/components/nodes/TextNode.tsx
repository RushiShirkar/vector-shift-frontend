import { useMemo, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { NodeCard } from './NodeCard';
import { SourceRight } from './handles';
import { Textarea } from '../common/Textarea';
import { TextNodeData } from '../../types/nodes';

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
    <NodeCard title="Text" style={{ width: Math.min(400, 200 + Math.floor(currText.length / 15) * 20) }}>
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

