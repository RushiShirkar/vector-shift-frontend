import { useCallback } from 'react';

export const useDraggableNode = () => {
  const onDragStart = useCallback((event: React.DragEvent, nodeType: string) => {
    const appData = { nodeType };
    (event.target as HTMLElement).style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  const onDragEnd = useCallback((event: React.DragEvent) => {
    (event.target as HTMLElement).style.cursor = 'grab';
  }, []);

  return { onDragStart, onDragEnd };
};