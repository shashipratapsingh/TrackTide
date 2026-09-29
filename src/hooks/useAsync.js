import { useCallback, useState } from "react";

export function useAsync(asyncFunction) {
  const [state, setState] = useState({ loading: false, error: null, data: null });

  const execute = useCallback(async (...args) => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await asyncFunction(...args);
      setState({ loading: false, error: null, data });
      return data;
    } catch (error) {
      setState({ loading: false, error, data: null });
      throw error;
    }
  }, [asyncFunction]);

  return { ...state, execute };
}
