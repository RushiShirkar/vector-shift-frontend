import { useState, useCallback } from 'react';
import { AppHeader } from './AppHeader';
import { ToastHost, type ToastMessage } from '../common/Toast';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((title: string, variant: ToastMessage['variant'] = 'error', description?: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [...prev, { id, title, description, variant }]);
  }, []);

  const removeToast = useCallback((id: number) => setToasts((prev) => prev.filter((t) => t.id !== id)), []);

  return (
    <div className="h-screen overflow-hidden p-3">
      <div className="h-full flex flex-col overflow-hidden border border-gray-200 rounded-lg">
        <AppHeader onSubmitError={(text) => addToast('Request failed', 'error', text)} />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
      <ToastHost toasts={toasts} onClose={removeToast} />
    </div>
  );
};