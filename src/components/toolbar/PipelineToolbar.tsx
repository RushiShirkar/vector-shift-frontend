import { useMemo, useState } from 'react';
import { DraggableNode } from './DraggableNode';
import { Tabs } from '../common/Tabs';
import { Input } from '../common/Input';
import { OTHER_NODES, START_NODES, TOOLBAR_TABS } from '../../data/tabs';
import { Search } from 'lucide-react';

export const PipelineToolbar: React.FC = () => {
  const [tab, setTab] = useState<'start' | 'other'>('start');
  const [query, setQuery] = useState('');
  const tabs = TOOLBAR_TABS;

  const visibleNodes = useMemo(() => {
    const list = tab === 'start' ? START_NODES : OTHER_NODES;
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((n) => n.label.toLowerCase().includes(q) || n.type.toLowerCase().includes(q));
  }, [tab, query]);

  return (
    <div className="py-2 px-4 bg-gray-50 md:px-8">
      <div className="flex items-center gap-4 mb-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Nodes"
          className="h-6 font-normal text-xs"
          containerClassName="w-[172px]"
          leftIcon={<Search className="w-3 h-3" />}
        />
        <Tabs tabs={tabs} value={tab} onChange={(v) => setTab(v as 'start' | 'other')} size="sm" />
      </div>
      <div className="flex flex-wrap gap-2">
        {visibleNodes.map((n) => (
          <DraggableNode key={n.type} type={n.type} label={n.label} icon={n.icon} />
        ))}
      </div>
    </div>
  );
};