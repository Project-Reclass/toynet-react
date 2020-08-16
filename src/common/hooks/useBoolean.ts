import { useState, useCallback } from 'react';

export function useBoolean(initialValue: boolean) {
  const [bool, setBool] = useState(initialValue);

  const setTrue = useCallback(() => setBool(true), []);
  const setFalse = useCallback(() => setBool(false), []);
  const toggle = useCallback(() => setBool(bool => !bool), []);

  return { bool, setTrue, setFalse, toggle };
}

export default useBoolean;