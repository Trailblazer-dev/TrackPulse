import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';

interface UseApiMutationOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<{ data: TData; status: number; message: string }>;
  mutationKey: string;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: any, variables: TVariables) => void;
}

export function useApiMutation<TData = any, TVariables = any>({
  mutationFn,
  mutationKey,
  onSuccess,
  onError
}: UseApiMutationOptions<TData, TVariables>) {
  const [data, setData] = useState<TData | null>(null);
  const { status, error, setLoading, setSuccess, setError, reset } = useApi();

  const mutate = async (variables: TVariables) => {
    try {
      setLoading(mutationKey);
      const response = await mutationFn(variables);
      setData(response.data);
      setSuccess(mutationKey);
      onSuccess?.(response.data, variables);
      return response.data;
    } catch (err: any) {
      setError(mutationKey, err);
      onError?.(err, variables);
      throw err;
    }
  };

  return {
    mutate,
    data,
    isLoading: status[mutationKey] === 'loading',
    isSuccess: status[mutationKey] === 'success',
    isError: status[mutationKey] === 'error',
    error: error[mutationKey],
    reset: () => reset(mutationKey)
  };
}
