import { renderHook, act } from '@testing-library/react-hooks'
import useAuthState, { AuthActions } from 'src/Login/AuthProvider/useAuthState';

const defaultUser = {
  id: 1,
  username: 'ProjectReclass',
}

describe('The useAuthState hook', () => {
  it('should set defaults as not logged in', () => {
    const { result } = renderHook(() => useAuthState());

    expect(result.current[0].id).toBe(-1);
    expect(result.current[0].username).toBe('');
    expect(result.current[0].isLoggedIn).toBeFalsy();
  });
  it('should set username, id, and set logged in to true on login', () => {
    const { result } = renderHook(() => useAuthState());

    act(() => {
      result.current[1]({ type: AuthActions.LOGIN, payload: defaultUser })
    });

    expect(result.current[0].id).toBe(defaultUser.id);
    expect(result.current[0].username).toBe(defaultUser.username);
    expect(result.current[0].isLoggedIn).toBeTruthy();
  });
  it('should unset all values back to default on logout', () => {
    const { result } = renderHook(() => useAuthState());

    act(() => {
      result.current[1]({ type: AuthActions.LOGIN, payload: defaultUser })
    });

    // First we login and check that it worked
    expect(result.current[0].id).toBe(defaultUser.id);
    expect(result.current[0].username).toBe(defaultUser.username);
    expect(result.current[0].isLoggedIn).toBeTruthy();

    // now we check that we've logged out
    act(() => {
      result.current[1]({ type: AuthActions.LOGOUT })
    });

    expect(result.current[0].id).toBe(-1);
    expect(result.current[0].username).toBe('');
    expect(result.current[0].isLoggedIn).toBeFalsy();
  });
  it('should be able to set the username', () => {
    const { result } = renderHook(() => useAuthState());
    act(() => {
      result.current[1]({
        type: AuthActions.SET_USERNAME,
        payload: { username: defaultUser.username }
      });
    });

    expect(result.current[0].username).toBe(defaultUser.username);
  });
  it('should be able to set the id', () => {
    const { result } = renderHook(() => useAuthState());
    act(() => {
      result.current[1]({
        type: AuthActions.SET_ID,
        payload: { id: defaultUser.id }
      });
    });

    expect(result.current[0].id).toBe(defaultUser.id);
  })
})