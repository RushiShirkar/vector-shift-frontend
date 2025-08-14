import { http } from './http';

export type ParseResponse = {
	num_nodes: number;
	num_edges: number;
	is_dag: boolean;
};

export const parsePipeline = (body: unknown) => {
  return http<ParseResponse>('/pipelines/parse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
};
