export class HttpError extends Error {
	status: number;
	constructor(message: string, status: number) {
		super(message);
		this.name = 'HttpError';
		this.status = status;
	}
}

const DEFAULT_TIMEOUT_MS = 15000;

export interface RequestOptions extends RequestInit {
	timeoutMs?: number;
	headers?: Record<string, string>;
}

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

export async function http<T>(path: string, options: RequestOptions = {}): Promise<T> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);

	try {
		const res = await fetch(`${API_BASE_URL}${path}`.replace(/\/$/, ''), {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(options.headers ?? {}),
			},
			signal: controller.signal,
		});

		const isJson = res.headers.get('Content-Type')?.includes('application/json');
		const payload = isJson ? await res.json().catch(() => undefined) : undefined;

		if (!res.ok) {
			const msg = (payload && (payload.message || payload.error)) || `Request failed: ${res.status}`;
			throw new HttpError(msg, res.status);
		}

		return (payload as T) ?? (undefined as unknown as T);
	} catch (err: any) {
		if (err?.name === 'AbortError') {
			throw new HttpError('Request timed out', 408);
		}
		throw err;
	} finally {
		clearTimeout(timeout);
	}
}