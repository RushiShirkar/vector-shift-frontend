import { NodeProps } from 'reactflow';
import { Textarea } from '../common/Textarea';
import { X } from 'lucide-react';
import { Button } from '../common/Button';
import { useStore } from '../../zustand/store';

export const NoteNode: React.FC<NodeProps<{ id: string; nodeType: 'note'; text?: string }>> = ({ id }) => {
  const removeNode = useStore((s) => s.removeNode);
  return (
    <div className="w-64 rounded-xl bg-yellow-50 border border-yellow-200 shadow-sm overflow-hidden">
      <div className="px-2 py-1 flex items-center justify-end">
        <Button
          variant="ghost"
          aria-label="Delete note"
          onClick={() => removeNode(id)}
          className="h-6 w-6 p-0 grid place-items-center text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800 focus-visible:ring-yellow-400"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="p-3">
        <Textarea
          label=""
          placeholder="Enter your note here..."
          defaultValue={''}
          autoGrow
          className="border-yellow-300 text-yellow-900 placeholder:text-yellow-700/80"
          style={{ backgroundColor: '#FFF' }}
        />
      </div>
    </div>
  );
};