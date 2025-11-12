import { useDraggableNode } from '../../hooks/useDraggableNode';

export const DraggableNode: React.FC<{
  type: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}> = ({ type, label, icon: Icon }) => {
  const { onDragStart, onDragEnd } = useDraggableNode();
  const isDisabled = type === 'no';

  const baseClasses = `
    group min-w-[72px] h-16 flex items-center justify-center flex-col rounded-lg px-3 
    select-none border transition-shadow transition-colors border-gray-200 shadow-sm
  `;
  const interactiveClasses = `
    cursor-grab bg-white text-gray-900 border-gray-200 shadow-sm hover:shadow-md hover:border-brand-500 
    hover:bg-brand-50 hover:text-brand-700
  `;
  const disabledClasses = `
    cursor-default bg-gray-100 text-gray-400 border-gray-200 shadow-none`;

  return (
    <div
      className={`${baseClasses} ${isDisabled ? disabledClasses : interactiveClasses}`}
      draggable={!isDisabled}
      onDragStart={(event) => (isDisabled ? undefined : onDragStart(event, type))}
      onDragEnd={(event) => (isDisabled ? undefined : onDragEnd(event))}
      role={isDisabled ? undefined : 'button'}
      aria-label={isDisabled ? undefined : `Drag ${label} node`}
      aria-disabled={isDisabled}
    >
      {Icon ? (
        <Icon
          className={`mb-2 w-4 h-4 text-gray-600 transition-colors ${
            isDisabled ? 'text-gray-400' : 'group-hover:text-brand-600'
          }`}
        />
      ) : null}
      <span
        className={`text-xs font-medium transition-colors ${
          isDisabled ? 'text-gray-400' : 'group-hover:text-brand-700'
        }`}
      >
        {label}
      </span>
    </div>
  );
};