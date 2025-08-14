import { NodeProps } from 'reactflow';
import { NodeCard } from './shared';
import { Textarea } from '../common/Textarea';

export const NoteNode: React.FC<NodeProps<{ id: string; nodeType: 'note'; text?: string }>> = ({ id }) => {
  return (
    <NodeCard title="Note" showOutputsIndicator={false} className="bg-yellow-50 border-yellow-200" nodeId={id}>
      <Textarea
        label=""
        placeholder="Add a note..."
        defaultValue={''}
        autoGrow
        className="bg-yellow-50"
      />
    </NodeCard>
  );
};


