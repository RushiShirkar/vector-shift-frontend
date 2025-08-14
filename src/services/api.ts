export const API_BASE_URL = 'https://vector-shift-backend-delta.vercel.app';

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`.replace(/\/$/, '');

  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  const contentType = res.headers.get('Content-Type') || '';
  const isJson = contentType.includes('application/json');

  let payload: any;
  try {
    payload = isJson ? await res.json() : await res.text();
  } catch {
    payload = undefined;
  }

  if (!res.ok) {
    const message = (payload && (payload.message || payload.error)) || `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return payload as T;
}