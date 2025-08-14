import { Handle, Position } from 'reactflow';

export const SourceRight: React.FC<{ id: string; topPct?: number; topPx?: number }> = ({ id, topPct, topPx }) => {
  const style: React.CSSProperties | undefined =
    typeof topPx === 'number' ? { top: topPx } : topPct ? { top: `${topPct}%` } : undefined;

  return (
    <Handle 
      type="source" 
      position={Position.Right} 
      id={id} 
      style={style} 
      className="w-2 h-2"
    />
  );
};

export const TargetLeft: React.FC<{ id: string; topPct?: number }> = ({ id, topPct }) => (
  <Handle 
    type="target" 
    position={Position.Left} 
    id={id} 
    style={topPct ? { top: `${topPct}%` } : undefined} 
    className="w-2 h-2"
  />
);