import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Custom React hook for managing WebSocket connections.
 *
 * @param {string} url - The WebSocket endpoint URL.
 * @param {number} [retryInterval=2000] - The interval for retrying a connection in milliseconds.
 * @param {number} [maxAttempts=5] - Maximum number of connection attempts before stopping.
 * @param {number} [maxMessages=100] - Maximum number of stored messages in state.
 *
 * @returns {{
 *   messages: string[],
 *   isConnected: boolean,
 *   sendMessage: (message: string) => void
 * }}
 *
 * @example
 * const { messages, isConnected, sendMessage } = useWebSocket('ws://example.com');
 */

function useWebSocket(url: string, retryInterval = 2000, maxAttempts = 5, maxMessages = 100) {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<number | null>(null);
  const attemptCountRef = useRef<number>(0);
  
  const handleOpen = () => {
    setIsConnected(true);
    attemptCountRef.current = 0; // Reset attempt count on successful connection
  };
  
  const handleError = (error: Event) => {
    //console.error(`WebSocket Error:`, error);
  };
  
  const handleMessage = (e: MessageEvent) => {
    setMessages(prevMessages => {
      const newMessages = [...prevMessages, e.data];
      return newMessages.slice(-maxMessages); // Limit the size of message array
    });
  };
  
  const handleClose = (event: CloseEvent) => {
    setIsConnected(false);
    if (event.code === 1000) {
      console.log("WebSocket closed normally.");
      return;
    }
    
    console.log(`WebSocket closed with code ${event.code}. Reconnecting...`);
    
    if (reconnectRef.current) {
      clearTimeout(reconnectRef.current);
    }
    
    attemptCountRef.current += 1;
    reconnectRef.current = window.setTimeout(initializeWebSocket, retryInterval * Math.pow(2, attemptCountRef.current));
  };
  
  const initializeWebSocket = () => {
    if (attemptCountRef.current >= maxAttempts) {
      console.error("Max reconnect attempts reached");
      return;
    }
    
    wsRef.current = new WebSocket(url);
    wsRef.current.onopen = handleOpen;
    wsRef.current.onerror = handleError;
    wsRef.current.onmessage = handleMessage;
    wsRef.current.onclose = handleClose;
  };
  
  useEffect(() => {
    initializeWebSocket();
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectRef.current) {
        clearTimeout(reconnectRef.current);
      }
    };
  }, [url]);
  
  /**
   * Sends a message through the WebSocket.
   *
   * @param {string} message - The message to send.
   */
  
  const sendMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    } else {
      //console.error("Can't send message. WebSocket is not open.");
    }
  };
  
  const output = useMemo(() => {
    return { messages, isConnected, sendMessage };
  }, [messages, isConnected]);
  
  return output;
}

export default useWebSocket;
