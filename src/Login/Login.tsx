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
import React, { useEffect, useState } from 'react';
import { Box, Heading, Stack, useToast } from '@chakra-ui/core';

import { useAuthContext, AuthActions } from './AuthProvider';
import { useLogin } from 'src/common/api/login/hooks';
import { Center, ToyNetInput, ToyNetButton } from './styled';
import PasswordInput from './PasswordInput';

const minimumInputLength = 3;

const Login = () => {
  const toast = useToast();
  const { dispatch } = useAuthContext();
  const [login, { data, isLoading, isSuccess, isError }] = useLogin();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      dispatch({ type: AuthActions.LOGIN, payload: data });
      console.log('login success!', { user: data });
    }
  }, [data, dispatch, isLoading, isSuccess]);

  useEffect(() => {
    if (!isLoading && isError) {
      toast({
        title: 'Unable to log you',
        description: 'Please check your credentials and try again.',
        status: 'error',
        isClosable: true,
      });
    }
  }, [isError, isLoading, toast]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleLogin();
  };

  const handleLogin = () => {
    setUsernameInvalid(username.length <= minimumInputLength);
    setPasswordInvalid(password.length <= minimumInputLength);
    if (
      username.length > minimumInputLength &&
      password.length > minimumInputLength
    ) {
      login({ username, password });
      return;
    }
    toast({
      title: 'Invalid username or password.',
      description: 'Please enter a valid username and password',
      status: 'warning',
      isClosable: true,
    });
  };

  return (
    <Box width="100%" height="100vh">
      <Center width="25rem" height="30vh">
        <form>
          <Stack spacing={4}>
            <Heading textAlign="center">Login to ToyNet!</Heading>
            <ToyNetInput
              placeholder="Username"
              type="text"
              autoComplete="username"
              onKeyPress={handleEnter}
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.currentTarget.value)
              }
              isInvalid={usernameInvalid}
              errorBorderColor="red.300"
            />
            <PasswordInput
              placeholder="Password"
              autoComplete="current-password"
              onKeyPress={handleEnter}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.currentTarget.value)
              }
              isInvalid={passwordInvalid}
              errorBorderColor="red.300"
            />
            <ToyNetButton onClick={handleLogin}>Sign In</ToyNetButton>
          </Stack>
        </form>
      </Center>
    </Box>
  );
};

export default Login;
