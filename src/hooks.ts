import { useEffect, useState } from "react";

export function useLoad<T>(loadFunc: () => Promise<T>): [T | null, boolean] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function load() {
    setLoading(true);
    const response = await loadFunc();
    setData(response);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return [data, loading];
}
