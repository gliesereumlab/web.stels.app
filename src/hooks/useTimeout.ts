import { useEffect, useRef } from 'react';

/**
 * Custom React hook to invoke a callback after a specified delay.
 *
 * @param {() => void} callback - The function to be executed after the delay.
 * @param {number | null} delay - Delay in milliseconds. If `null`, the timeout is not started.
 *
 * @example
 * useTimeout(() => {
 *   console.log('This will be logged after 1 second.');
 * }, 1000);
 */

function useTimeout(callback: () => void, delay: number | null): void {
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (delay !== null && callback && typeof callback === 'function') {
      timer = setTimeout(callbackRef.current, delay || 0);
    }
    
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [callback, delay]);
}

export default useTimeout;
