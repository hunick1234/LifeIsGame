import React, { useRef } from "react";

export const useFetch = (url, options) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [abortController, setAbortController] = React.useState(null);
  const isload = useRef(true);
  React.useEffect(() => {
    
    const fetchData = async () => {
      try {
        const controller = new AbortController();
        const signal = controller.signal;
        setAbortController(controller);
        const res = await fetch(url, { signal, ...options });
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    };
    if (isload.current) {
      fetchData();
      isload.current = false;
    }

    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, []);

  return { response, error, abortController };
};
