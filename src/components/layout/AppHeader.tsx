import { SubmitButton } from '../ui/SubmitButton';

export const AppHeader: React.FC<{ onSubmitError?: (text: string) => void }> = ({ onSubmitError }) => {
  return (
    <header 
      className="shrink-0 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
    >
      <div className="px-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="inline-flex items-center gap-1">
              <span className="i ri:stack-line" />
              Pipelines
            </span>
            <span>›</span>
            <span className="truncate max-w-[16rem]">Copy of Search a Knowledge Bas...</span>
            <span className="ml-2 rounded-md px-1.5 py-0.5 bg-gray-100 text-gray-700">Edit</span>
          </div>
          <div className="flex items-center gap-2 py-2">
            <SubmitButton onError={onSubmitError} />
          </div>
        </div>
      </div>
    </header>
  );
};