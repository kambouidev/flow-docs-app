import { useEffect, useRef, useCallback, useState } from 'react';
import { INotification } from '../types/INotification';
import { useNotifications } from '../stores/notifications.store';

type WebSocketStatus = 'CONNECTING' | 'OPEN' | 'CLOSED' | 'CLOSING';

export const useWebSocket = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>('CLOSED');
  const [error, setError] = useState<string | null>(null);
  const { addNotification } = useNotifications();

  const connect = useCallback(() => {
    try {
      const wsUrl = `${process.env.EXPO_PUBLIC_WS_URL}notifications`;
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        //console.log('🟢 WebSocket Connected');
        setStatus('OPEN');
        setError(null);
      };

      wsRef.current.onclose = () => {
        //console.log('🔴 WebSocket Disconnected');
        setStatus('CLOSED');
        setTimeout(connect, 5000);
      };

      wsRef.current.onerror = (error) => {
        //console.error('⚠️ WebSocket Error:', error, wsUrl);
        setError('Error en la conexión WebSocket');
      };

      wsRef.current.onmessage = (event) => {
        //console.log('📩 WebSocket Message:', event.data);
        try {
          const newNotification: Omit<INotification, 'seen'> = JSON.parse(event.data);
          addNotification({ ...newNotification, seen: false });
        } catch (error) {
          //console.error('Error parsing WebSocket message:', error);
        }
      };
    } catch (error) {
      //console.error('Error creating WebSocket connection:', error);
      setError('Error al crear la conexión WebSocket');
    }
  }, []);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setStatus('CLOSED');
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    status,
    error,
    reconnect: connect,
    disconnect,
  };
};
