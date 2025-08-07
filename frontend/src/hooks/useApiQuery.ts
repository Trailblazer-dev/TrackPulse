import { useState, useEffect } from 'react';
import { useApi } from '../contexts/ApiContext';

interface UseApiQueryOptions<T> {
  queryFn: () => Promise<{ data: T; status: number; message: string }>;
  queryKey: string;
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

export function useApiQuery<T = any>({
  queryFn,
  queryKey,
  enabled = true,
  onSuccess,
  onError
}: UseApiQueryOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const { status, error, setLoading, setSuccess, setError } = useApi();
  
  const refetch = async () => {
    try {
      setLoading(queryKey);
      const response = await queryFn();
      setData(response.data);
      setSuccess(queryKey);
      onSuccess?.(response.data);
      return response.data;
    } catch (err: any) {
      setError(queryKey, err);
      onError?.(err);
      return null;
    }
  };
  
  useEffect(() => {
    if (enabled) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, queryKey]);
  
  return {
    data,
    isLoading: status[queryKey] === 'loading',
    isSuccess: status[queryKey] === 'success',
    isError: status[queryKey] === 'error',
    error: error[queryKey],
    refetch
  };
}
