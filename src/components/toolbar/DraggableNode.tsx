import { useDraggableNode } from '../../hooks/useDraggableNode';

export const DraggableNode: React.FC<{ type: string; label: string; icon?: React.ComponentType<{ className?: string }> }> = ({ type, label, icon: Icon }) => {
  const { onDragStart, onDragEnd } = useDraggableNode();

  return (
		<div
			className="group cursor-grab min-w-[72px] h-16 flex items-center justify-center flex-col rounded-lg bg-white text-gray-900 px-3 select-none border border-gray-200 shadow-sm hover:shadow-md transition-shadow transition-colors hover:border-brand-500 hover:bg-brand-50"
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      onDragEnd={(e) => onDragEnd(e)}
      role="button"
      aria-label={`Drag ${label} node`}
    >
      {Icon ? <Icon className="mb-2 w-4 h-4 text-gray-600 transition-colors group-hover:text-brand-600" /> : null}
      <span className="text-xs font-medium transition-colors group-hover:text-brand-700">{label}</span>
    </div>
  );
};