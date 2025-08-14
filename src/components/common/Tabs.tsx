import { useCallback, useEffect, useId, useRef, useState } from 'react';
import clsx from 'clsx';

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const Tabs: React.FC<TabsProps> = ({ tabs, value, onChange, className, size = 'md' }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const idBase = useId();
  const activeIndex = Math.max(0, tabs.findIndex((t) => t.id === value));
  const [focusIndex, setFocusIndex] = useState(activeIndex);

  useEffect(() => setFocusIndex(activeIndex), [activeIndex]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (tabs.length === 0) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = (focusIndex + dir + tabs.length) % tabs.length;
        setFocusIndex(next);
        const el = listRef.current?.querySelector<HTMLButtonElement>(`[data-index="${next}"]`);
        el?.focus();
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onChange(tabs[focusIndex].id);
      }
    },
    [focusIndex, onChange, tabs]
  );

  const textSize = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <div className={clsx('w-full', className)}>
      <div
        ref={listRef}
        role="tablist"
        aria-orientation="horizontal"
        className="flex items-center gap-3"
        onKeyDown={onKeyDown}
      >
        {tabs.map((tab, idx) => {
          const isActive = tab.id === value;
          return (
            <button
              key={tab.id}
              data-index={idx}
              id={`${idBase}-${tab.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${idBase}-${tab.id}-panel`}
              className={clsx(
                'relative pb-1 leading-none focus:outline-none inline-flex items-center h-6 px-2',
                textSize,
                isActive ? 'text-brand-500 font-medium' : 'text-gray-800 hover:text-brand-500'
              )}
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
              <span
                aria-hidden
                className={clsx(
                  'pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] transition-colors',
                  isActive ? 'bg-brand-500' : 'bg-transparent'
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};