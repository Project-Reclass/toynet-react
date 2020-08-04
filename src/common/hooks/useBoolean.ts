import { useState, useCallback } from 'react';

export function useBoolean(defaultValue: boolean = false) {
  const [bool, setBool] = useState(defaultValue);
  const setTrue = useCallback(() => {
    setBool(true);
  }, []);

  const setFalse = useCallback(() => {
    setBool(false);
  }, []);

  const toggle = useCallback(() => {
    setBool(prev => !prev);
  }, []);

  return {bool, setTrue, setFalse, toggle};
}

export default useBoolean;