import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import useBoolean from 'src/common/hooks/useBoolean';

afterEach(cleanup);

describe('The useBoolean custom hook', () => {
  it('should allow setting a default value', () => {
    const { result } = renderHook(() => useBoolean(false));
    expect(result.current.bool).toBeFalsy();
  });

  it('should be able to set value to true', () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.setTrue();
    });

    expect(result.current.bool).toBeTruthy();
  });

  it('should be able to set value to false', () => {
    const { result } = renderHook(() => useBoolean(true));

    act(() => {
      result.current.setFalse();
    });

    expect(result.current.bool).toBeFalsy();
  });

  it('should be able to toggle value', () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.toggle();
    });

    expect(result.current.bool).toBeTruthy();

    act(() => {
      result.current.toggle();
    });

    expect(result.current.bool).toBeFalsy();
  })
})