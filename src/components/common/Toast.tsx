import { useEffect, useState } from 'react';
import clsx from 'clsx';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastMessage {
	id: number;
	title: string;
	description?: string;
	variant?: ToastVariant;
}

export const Toast: React.FC<{ message: ToastMessage; onClose: (id: number) => void; durationMs?: number }>
	= ({ message, onClose, durationMs = 3000 }) => {
	const [open, setOpen] = useState(true);
	useEffect(() => {
		const t = setTimeout(() => { setOpen(false); onClose(message.id); }, durationMs);
		return () => clearTimeout(t);
	}, [message.id, onClose, durationMs]);

	if (!open) return null;
	return (
		<div
			className={clsx(
				'pointer-events-auto rounded-md px-3 py-2 shadow-md text-sm text-white w-80',
				'border-l-4',
				message.variant === 'error' && 'bg-red-600 border-red-300',
				message.variant === 'success' && 'bg-green-600 border-green-300',
				message.variant !== 'error' && message.variant !== 'success' && 'bg-gray-900 border-gray-600'
			)}
			role="alert"
		>
			<div className="font-semibold">{message.title}</div>
			{message.description && (
				<div className="text-[12px] opacity-90">{message.description}</div>
			)}
		</div>
	);
};

export const ToastHost: React.FC<{ toasts: ToastMessage[]; onClose: (id: number) => void }>
	= ({ toasts, onClose }) => {
	return (
		<div className="fixed bottom-4 right-4 z-[60] grid gap-2">
			{toasts.map((t) => (
				<Toast key={t.id} message={t} onClose={onClose} />
			))}
		</div>
	);
};

