import { renderHook, act, cleanup } from '@testing-library/react-hooks'
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
    const value = 42;
    window.sessionStorage.setItem(key, value);
    const parser = (value) => parseInt(value);
    const { result } = renderHook(() => useSessionStorage(key, 'test', parser));

    act(() => {
      expect(result.current[0]).toEqual(value);
      expect(typeof result.current[0] === 'number');
    });
  });

  it('should allow for a parser to parse into an object', () => {
    const value = { meaningOfLife: 42 }
    window.sessionStorage.setItem(key, JSON.stringify(value));
    const { result } = renderHook(() => useSessionStorage(key, {}, JSON.parse));

    act(() => {
      expect(result.current[0]).toEqual(value);
      expect(typeof result.current[0] === 'object');
    });
  });
});