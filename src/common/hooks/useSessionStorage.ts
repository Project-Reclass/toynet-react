/*
Copyright (C) 1992-2021 Free Software Foundation, Inc.

This file is part of ToyNet React.

ToyNet React is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free
Software Foundation; either version 3, or (at your option) any later
version.

ToyNet React is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
for more details.

You should have received a copy of the GNU General Public License
along with ToyNet React; see the file LICENSE.  If not see
<http://www.gnu.org/licenses/>.

*/
import { useState, useEffect, useCallback } from 'react';

import { AsyncStateHook } from '../types';

import useBoolean from './useBoolean';

/**
 * Stores the value in session storage. When component is initially loaded
 * from either cold load for from a refresh, it checks session storage for
 * a value with the provided key. If a value is found, it sets the value to
 * the value from session storage. Setting the value from sessionStorage is
 * async so do not expect the value from sessionStorage to be loaded instantly.
 *
 * It takes in an optional `parser` which is a function that is run before returning
 * that value from the state hook. This is necessary because session storage only returns
 * a string, however, we might want a JSON object or a number stored in session storage.
 *
 * E.g. useSessionStorage('my-number', 1, (value) => parseInt(value)) => number
 */
export function useSessionStorage<T>(
  key: string,
  value: T,
  parser?: (value: string) => T,
): AsyncStateHook<T> {
  const [sessionValue, setSessionValue] = useState<T>(value);
  const {bool: hasInitialize, setTrue: setInitialized} = useBoolean(false);

  useEffect(() => {
    setInitialized();
    const loadedValue = sessionStorage.getItem(key);
    if (loadedValue) {
      setSessionValue(parser ? parser(loadedValue) : loadedValue as any);
    }
  }, [key, parser, setInitialized]);

  const setValueInStorage = useCallback((value: T) => {
    // Since sessionStorage blocks the main thread it's probably best to
    // throw it on the callback queue so that the runtime loop can decide
    // when there is free time to run the callback.
    setTimeout(() => {
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);
    }, 0);
    setSessionValue(value);
  }, [key]);

  return [sessionValue, setValueInStorage, hasInitialize];
}