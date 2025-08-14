import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './api';

export type ParseResponse = {
  num_nodes: number;
  num_edges: number;
  is_dag: boolean;
};

export const parsePipeline = (body: unknown) =>
  request<ParseResponse>('/pipelines/parse', {
    method: 'POST',
    body: JSON.stringify(body),
  });

export function useParsePipelineMutation(
  options?: UseMutationOptions<ParseResponse, Error, { body: unknown }>
) {
  return useMutation<ParseResponse, Error, { body: unknown }>({
    mutationKey: ['parsePipeline'],
    mutationFn: ({ body }) => parsePipeline(body),
    ...options,
  });
}