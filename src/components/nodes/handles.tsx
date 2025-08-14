import { Handle, Position } from 'reactflow';

export const SourceRight: React.FC<{ id: string }> = ({ id }) => (
  <Handle type="source" position={Position.Right} id={id} />
);

export const TargetLeft: React.FC<{ id: string; topPct?: number }> = ({ id, topPct }) => (
  <Handle type="target" position={Position.Left} id={id} style={topPct ? { top: `${topPct}%` } : undefined} />
);

