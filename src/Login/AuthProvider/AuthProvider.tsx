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