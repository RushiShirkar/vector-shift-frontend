import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { X } from 'lucide-react';

export interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  data: { num_nodes: number; num_edges: number; is_dag: boolean } | null;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose, data }) => {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-base font-semibold">Pipeline Analysis</div>
          <div className="text-xs text-gray-500">Summary of your graph</div>
        </div>
        <Button
          aria-label="Close"
          onClick={onClose}
          variant="secondary"
          className="h-8 px-2 py-0 rounded-full"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      {data ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-md border border-gray-200 p-3 text-center">
              <div className="text-[11px] text-gray-500">Nodes</div>
              <div className="text-lg font-semibold">{data.num_nodes}</div>
            </div>
            <div className="rounded-md border border-gray-200 p-3 text-center">
              <div className="text-[11px] text-gray-500">Edges</div>
              <div className="text-lg font-semibold">{data.num_edges}</div>
            </div>
            <div className="rounded-md border border-gray-200 p-3 text-center">
              <div className="text-[11px] text-gray-500">DAG</div>
              <div className={data.is_dag ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                {data.is_dag ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-600">No data available</div>
      )}
    </Modal>
  );
};