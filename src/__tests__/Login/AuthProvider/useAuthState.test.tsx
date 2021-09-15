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
import { renderHook, act } from '@testing-library/react-hooks';
import useAuthState, {
  AuthActions,
  User,
} from 'src/Login/AuthProvider/useAuthState';

const defaultUser: User = {
  id: 1,
  username: 'ProjectReclass',
  isLoggedIn: false,
};

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
      result.current[1]({ type: AuthActions.LOGIN, payload: defaultUser });
    });

    expect(result.current[0].id).toBe(defaultUser.id);
    expect(result.current[0].username).toBe(defaultUser.username);
    expect(result.current[0].isLoggedIn).toBeTruthy();
  });
  it('should unset all values back to default on logout', () => {
    const { result } = renderHook(() => useAuthState());

    act(() => {
      result.current[1]({ type: AuthActions.LOGIN, payload: defaultUser });
    });

    // First we login and check that it worked
    expect(result.current[0].id).toBe(defaultUser.id);
    expect(result.current[0].username).toBe(defaultUser.username);
    expect(result.current[0].isLoggedIn).toBeTruthy();

    // now we check that we've logged out
    act(() => {
      result.current[1]({ type: AuthActions.LOGOUT, payload: {} });
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
        payload: { username: defaultUser.username },
      });
    });

    expect(result.current[0].username).toBe(defaultUser.username);
  });
  it('should be able to set the id', () => {
    const { result } = renderHook(() => useAuthState());
    act(() => {
      result.current[1]({
        type: AuthActions.SET_ID,
        payload: { id: defaultUser.id },
      });
    });

    expect(result.current[0].id).toBe(defaultUser.id);
  });
});
