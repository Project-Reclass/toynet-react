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
import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { useSessionStorage } from 'src/common/hooks/useSessionStorage';

const key = 'session-key';

afterEach(cleanup);

describe('The useSessionStorage hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.sessionStorage.clear();
  });
  it('should save a value in session storage with a specified key on change', async () => {
    const valueToSet = 'hello there';
    const { result } = renderHook(() => useSessionStorage(key, 'test'));

    expect(window.sessionStorage.getItem(key)).toBeFalsy();
    act(() => {
      result.current[1](valueToSet);
    });

    // this is needed because useSessionStorage uses setTimeout to set in sessionStorage
    jest.runOnlyPendingTimers();

    expect(window.sessionStorage.getItem(key)).toEqual(valueToSet);
    expect(result.current[0]).toEqual(valueToSet);
  });

  it('should load a default value from session storage', async () => {
    const value = 'Luke, I am your father';
    window.sessionStorage.setItem(key, value);
    const { result } = renderHook(() => useSessionStorage(key, 'test'));

    act(() => {
      expect(result.current[0]).toEqual(value);
    });
  });

  it('should allow for a parser to from session storage to number', () => {
    const value = '42';
    const PARSEDVALUE = 42;
    window.sessionStorage.setItem(key, value);
    const parser = (value: string) => parseInt(value);
    const { result } = renderHook(() => useSessionStorage(key, PARSEDVALUE, parser));

    act(() => {
      expect(result.current[0]).toEqual(PARSEDVALUE);
      expect(typeof result.current[0] === 'number').toBeTruthy();
    });
  });

  const MEANING = 42;

  it('should allow for a parser to parse into an object', () => {
    const value = { meaningOfLife: MEANING };
    window.sessionStorage.setItem(key, JSON.stringify(value));
    const { result } = renderHook(() => useSessionStorage(key, {}, JSON.parse));

    act(() => {
      expect(result.current[0]).toEqual(value);
      expect(typeof result.current[0] === 'object').toBeTruthy();
    });
  });
});