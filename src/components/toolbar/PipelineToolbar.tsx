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
    <div className="py-3 px-8 bg-gray-50">
      <div className="flex items-center gap-6 mb-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Nodes"
          className="h-8"
          containerClassName="w-48"
          leftIcon={<Search className="w-4 h-4" />}
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