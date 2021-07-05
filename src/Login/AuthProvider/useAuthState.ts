import { useImmerReducer } from 'use-immer';

import { Action } from 'src/common/types';
import { TOKEN_KEY } from 'src/common/api/login/requests';
import { Dispatch, useEffect } from 'react';

const USER_KEY = 'toynet-user';
export interface User {
  token: string;
  username: string;
  isLoggedIn: boolean;
}

export enum AuthActions {
  SET_USERNAME,
  SET_ID,
  SET_USERNAME_TOKEN,
  LOGIN,
  LOGOUT,
}

export type ReducerAction = Action<AuthActions, Partial<User>>;

export const initialState: User = {
  token: '',
  username: '',
  isLoggedIn: false,
};

function reducer(draft: User, action: ReducerAction) {
  switch (action.type) {
    case AuthActions.SET_USERNAME:
      draft.username = action.payload.username || '';
      return draft;
    case AuthActions.SET_ID:
      return draft;
    case AuthActions.LOGIN:
      draft.isLoggedIn = true;
      draft.token = action.payload.token || '';
      draft.username = action.payload.username || '';

      localStorage.setItem(TOKEN_KEY, action.payload.token ||'');
      localStorage.setItem(USER_KEY, action.payload.username || '');
      return draft;
    case AuthActions.SET_USERNAME_TOKEN:
      draft.username = action.payload.username || '';
      draft.token = action.payload.token || '';
      return draft;
    case AuthActions.LOGOUT:
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
      return initialState;
  }
};

export default function useAuthState(): [User, Dispatch<ReducerAction>] {
  const [state, dispath] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    dispath({
      type: AuthActions.SET_USERNAME_TOKEN,
      payload: {
        username: localStorage.getItem(USER_KEY) || '',
        token: localStorage.getItem(TOKEN_KEY) || '',
      },
    });
  }, [dispath]);

  return [state, dispath];
}