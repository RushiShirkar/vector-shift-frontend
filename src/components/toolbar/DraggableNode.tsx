import { useDraggableNode } from '../../hooks/useDraggableNode';

export const DraggableNode: React.FC<{ type: string; label: string; icon?: React.ComponentType<{ className?: string }> }> = ({ type, label, icon: Icon }) => {
  const { onDragStart, onDragEnd } = useDraggableNode();

  return (
    <div
      className="cursor-grab min-w-[72px] h-16 flex items-center justify-center flex-col rounded-lg bg-white text-gray-900 px-3 select-none border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      onDragEnd={(e) => onDragEnd(e)}
      role="button"
      aria-label={`Drag ${label} node`}
    >
      {Icon ? <Icon className="mb-1 w-4 h-4 text-gray-600" /> : null}
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
};