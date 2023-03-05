import { useCallback, useEffect, useMemo, useState } from 'react';

const useGetHandler = <T>(fetchCallback: () => Promise<T>, enabled = true) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const isError = useMemo(() => !!error, [error]);
  const refetch = useCallback(async () => {
    if (!enabled) return;
    try {
      setIsLoading(true);
      const result = await fetchCallback();
      setData(result);
      return result;
    } catch (e) {
      console.error(e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [enabled, fetchCallback]);

  useEffect(() => {
    refetch();
  }, [enabled]);
  return { data, setData, isLoading, isError, error, refetch };
};

export default useGetHandler;
