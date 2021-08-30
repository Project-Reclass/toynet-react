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
import { useToast } from '@chakra-ui/core';
import React, { FC, useContext, useEffect } from 'react';
import useAuthState, { initialState, ReducerAction, User } from './useAuthState';

interface State extends User {
  dispatch: React.Dispatch<ReducerAction>;
}

const AuthContext = React.createContext<State>({
  ...initialState,
  dispatch: () => null,
});

export const AuthProvider: FC = ({ children }) => {
  const toast = useToast();
  const [state, dispatch] = useAuthState();

  useEffect(() => {
    if (state.isLoggedIn) {
      toast({
        title: 'You are now logged in',
        description: `You've successfully logged in as ${state.username}`,
        status: 'success',
        isClosable: true,
      });
    }
  }, [state.isLoggedIn, state.username, toast]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;