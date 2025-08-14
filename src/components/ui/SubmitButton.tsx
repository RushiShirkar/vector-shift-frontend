import { Button } from '../common/Button';
import { useStore, type State } from 'redux/store';
import { useState } from 'react';
import { parsePipeline, type ParseResponse } from '../../services/pipelines';
import { SuccessModal } from './SuccessModal';

export const SubmitButton: React.FC<{ onError?: (text: string) => void }> = ({ onError }) => {
  const { nodes, edges, resetGraph } = 
    useStore((s: State & { resetGraph: () => void }) => ({ 
      nodes: s.nodes, 
      edges: s.edges, 
      resetGraph: (s as any).resetGraph 
    }));
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<ParseResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onClick = async () => {
    setLoading(true);

    try {
      const resp = await parsePipeline({ nodes, edges });
      setData(resp);
      setOpen(true);
      resetGraph();
    } catch (err: any) {
      if (onError) {
        const message = err?.message || 'Failed to parse pipeline';
        onError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={onClick} 
        disabled={loading} 
        aria-busy={loading} 
        aria-live="polite" 
        variant="primary"
      >
        {loading && 
          <span 
            className="
              h-3 w-3 mr-2 inline-block rounded-full border-2 border-white/70 
              border-t-transparent animate-spin align-[-2px]
              bg-brand-500
            " 
            aria-hidden="true"
        />}
        {loading ? 'Processing…' : 'Submit'}
      </Button>
      <SuccessModal open={open} onClose={() => setOpen(false)} data={data} />
    </>
  );
};