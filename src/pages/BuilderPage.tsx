import { useState } from 'react';
import { PipelineToolbar } from '../components/toolbar/PipelineToolbar';
import { PipelineUI } from '../components/ui';
import { Button } from '../components/common/Button';
import { X, Plus } from 'lucide-react';

export const BuilderPage: React.FC = () => {
  const [showToolbar, setShowToolbar] = useState(true);

  return (
    <div className="h-full relative flex flex-col overflow-hidden">
      {showToolbar ? (
        <div className="relative shrink-0">
          <PipelineToolbar />
          <div className="absolute -bottom-14 left-6 z-10">
            <Button
              variant="secondary"
              onClick={() => setShowToolbar(false)}
              aria-pressed={showToolbar}
              aria-label="Hide nodes toolbar"
              className="w-10 h-10 rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="absolute top-3 left-6 z-10">
          <Button
            variant="secondary"
            onClick={() => setShowToolbar(true)}
            aria-pressed={showToolbar}
            aria-label="Show nodes toolbar"
            className="w-10 h-10 rounded-full"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      )}
      <div className="flex-1 min-h-0">
        <PipelineUI />
      </div>
    </div>
  );
};