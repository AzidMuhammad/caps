import { useEffect, useState } from 'react';

export function useWebSocket(url: string) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      setMessage(JSON.parse(event.data));
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return message;
}
