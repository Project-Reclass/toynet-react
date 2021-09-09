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
      return draft;
    case AuthActions.SET_ID:
      draft.id = action.payload.id || -1;
      return draft;
    case AuthActions.LOGIN:
      draft.isLoggedIn = true;
      draft.id = action.payload.id || -1;
      draft.username = action.payload.username || '';
      return draft;
    case AuthActions.LOGOUT:
      return initialState;
  }
};

export default function useAuthState() {
  return useImmerReducer(reducer, initialState);
}