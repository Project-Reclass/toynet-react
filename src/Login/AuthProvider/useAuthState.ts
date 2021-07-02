import { useImmerReducer } from 'use-immer';

import { Action } from 'src/common/types';
import { TOKEN_KEY } from 'src/common/api/login/requests';

export interface User {
  token: string;
  username: string;
  isLoggedIn: boolean;
}

export enum AuthActions {
  SET_USERNAME,
  SET_ID,
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
      return draft;
    case AuthActions.LOGOUT:
      return initialState;
  }
};

export default function useAuthState() {
  return useImmerReducer(reducer, initialState);
}