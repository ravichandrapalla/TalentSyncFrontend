import { useEffect, useState } from "react";

export function useDebounce({ fn, delay }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let timeOutId = setTimeout(() => {}, delay);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [fn, delay]);
  return { loading };
}
