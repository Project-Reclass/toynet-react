import { useImmerReducer } from 'use-immer';

import { Action } from 'src/common/types';

export interface User {
  id: number | string;
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
  id: -1,
  username: '',
  isLoggedIn: false,
};

function reducer(draft: User, action: ReducerAction) {
  switch (action.type) {
    case AuthActions.SET_USERNAME:
      draft.username = action.payload.username || '';
      return;
    case AuthActions.SET_ID:
      draft.id = action.payload.id || -1;
      return;
    case AuthActions.LOGIN:
      draft.isLoggedIn = true;
      draft.id = action.payload.id || -1;
      draft.username = action.payload.username || '';
      return;
    case AuthActions.LOGOUT:
      draft = initialState;
      return;
  }
};

export default function useAuthState() {
  return useImmerReducer(reducer, initialState);
}