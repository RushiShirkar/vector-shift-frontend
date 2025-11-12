import { Button } from '../common/Button';
import { useStore, type State } from '../../zustand/store';
import { useState } from 'react';
import { useParsePipelineMutation, type ParseResponse } from '../../services/pipelines';
import { SuccessModal } from './SuccessModal';

export const SubmitButton: React.FC<{ onError?: (text: string) => void }> = ({ onError }) => {
  const { nodes, edges, resetGraph } = 
    useStore((s: State) => ({ 
      nodes: s.nodes, 
      edges: s.edges, 
      resetGraph: s.resetGraph,
    }));
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<ParseResponse | null>(null);
  const { mutateAsync, isPending } = useParsePipelineMutation();

  const onClick = async () => {
    try {
      const resp = await mutateAsync({ body: { nodes, edges } });
      setData(resp);
      setOpen(true);
      resetGraph();
    } catch (err: any) {
      if (onError) {
        const message = err?.message || 'Failed to parse pipeline';
        onError(message);
      }
    }
  };

  return (
    <>
      <Button
        onClick={onClick} 
        disabled={isPending} 
        aria-busy={isPending} 
        aria-live="polite" 
        variant="primary"
      >
        {isPending && 
          <span 
            className="
              h-3 w-3 mr-2 inline-block rounded-full border-2 border-white/70 
              border-t-transparent animate-spin align-[-2px]
              bg-brand-500
            " 
            aria-hidden="true"
        />}
        {isPending ? 'Processing…' : 'Submit'}
      </Button>
      <SuccessModal open={open} onClose={() => setOpen(false)} data={data} />
    </>
  );
};