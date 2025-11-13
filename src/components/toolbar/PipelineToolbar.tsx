import { useMemo, useState } from 'react';
import { FileText, Search, X } from 'lucide-react';
import { DraggableNode } from './DraggableNode';
import { Tabs } from '../common/Tabs';
import { Input } from '../common/Input';
import { OTHER_NODES, START_NODES, TOOLBAR_TABS } from '../../data/tabs';

export const PipelineToolbar: React.FC = () => {
  const [tab, setTab] = useState<'start' | 'other'>('start');
  const [query, setQuery] = useState('');
  const tabs = TOOLBAR_TABS;

  const handleClearQuery = () => {
    setQuery('');
  };

  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;

  const visibleNodes = useMemo(() => {
    const q = trimmedQuery.toLowerCase();
    
    // When searching, look through all tabs
    if (q) {
      const allNodes = [...START_NODES, ...OTHER_NODES];
      return allNodes.filter((n) => n.label.toLowerCase().includes(q) || n.type.toLowerCase().includes(q));
    }
    
    // When not searching, show current tab's nodes
    return tab === 'start' ? START_NODES : OTHER_NODES;
  }, [tab, trimmedQuery]);

  const showNoNodes = hasQuery && visibleNodes.length === 0;

  return (
    <div className="py-2 px-4 bg-gray-50 md:px-8">
      <div className="flex items-center gap-4 mb-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Nodes"
          className="h-6 font-normal text-xs"
          containerClassName="flex-shrink-0 w-[120px] md:w-[172px]"
          leftIcon={<Search className="w-3 h-3" />}
          rightIcon={
            query
              ? (
                <button
                  type="button"
                  onClick={handleClearQuery}
                  aria-label="Clear search"
                  className="
                    flex h-4 w-4 items-center justify-center rounded text-gray-500 hover:text-gray-700 
                    focus:outline-none focus:ring-1 focus:ring-brand-500
                  "
                >
                  <X className="h-4 w-4" />
                </button>
              )
              : undefined
          }
        />
        <div className="min-w-0 flex-1">
          <Tabs tabs={tabs} value={tab} onChange={(v) => setTab(v as 'start' | 'other')} size="sm" />
        </div>
      </div>
      <ul 
        className="
          flex gap-2 flex-nowrap overflow-x-auto md:flex-wrap md:overflow-x-visible scrollbar-thin 
          scrollbar-thumb-slate-300 scrollbar-track-transparent pb-1 list-none
        "
        role="list"
        aria-label="Available nodes"
      >
        {showNoNodes ? (
          <DraggableNode key={'no'} type={'no'} label={'No Nodes Found'} icon={FileText} />
        ) : (
          visibleNodes.map((n) => (
            <DraggableNode key={n.type} type={n.type} label={n.label} icon={n.icon} />
          ))
        )}
      </ul>
    </div>
  );
};