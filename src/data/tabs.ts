import type { ComponentType } from 'react';
import { Brain, Upload, Type, MessageSquare, Clock3, Calculator, SplitSquareHorizontal, SquarePen, Notebook } from 'lucide-react';
export type ToolbarTab = {
  id: 'start' | 'other';
  label: string;
};

export const TOOLBAR_TABS: ToolbarTab[] = [
  { id: 'start', label: 'Start' },
  { id: 'other', label: 'Other' },
];

export type NodeDef = { type: string; label: string; icon: ComponentType<{ className?: string }> };

export const START_NODES: NodeDef[] = [
  { type: 'customInput', label: 'Input', icon: SquarePen },
  { type: 'llm', label: 'LLM', icon: Brain },
  { type: 'customOutput', label: 'Output', icon: Upload },
  { type: 'text', label: 'Text', icon: Type },
];

export const OTHER_NODES: NodeDef[] = [
  { type: 'prompt', label: 'Prompt', icon: MessageSquare },
  { type: 'delay', label: 'Delay', icon: Clock3 },
  { type: 'math', label: 'Math', icon: Calculator },
  { type: 'condition', label: 'Condition', icon: SplitSquareHorizontal },
  { type: 'note', label: 'Note', icon: Notebook },
];


