import { useEffect, useState } from "react";

export function useDebounce({ fn = null, delay = null }) {
  const [loading, setLoading] = useState(false);
  const [apirespData, setApiRespData] = useState(null);

  useEffect(() => {
    let timeOutId;
    const callApi = async () => {
      try {
        let resp = await fn();
      } catch (error) {
        throw new Error(error);
      }
    };

    if (delay && fn !== null) {
      timeOutId = setTimeout(callApi, delay);
    } else if (fn !== null) {
      callApi();
    }

    return () => {
      clearTimeout(timeOutId);
    };
  }, [fn, delay]);
  return { loading, apirespData };
}
