import { useCallback, useEffect, useState } from 'react';

export function useLoad<T>(
  loadFunc: () => Promise<T>,
  onMount: boolean = true,
): [T | null, boolean, Error | null, () => Promise<void>] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await loadFunc();
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const load = useCallback(loadData, []);

  useEffect(() => {
    if (onMount) {
      load();
    }
  }, [load, onMount]);

  return [data, loading, error, load];
}
