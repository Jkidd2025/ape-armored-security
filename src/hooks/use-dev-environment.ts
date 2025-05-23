
import { useMemo } from 'react';

export function useDevEnvironment() {
  const isDevEnvironment = useMemo(() => {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1';
  }, []);
  
  return isDevEnvironment;
}
