import React, { useEffect, useState, FC } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  InputProps,
  useToast,
} from '@chakra-ui/core';

import { useAuthContext, AuthActions } from './AuthProvider';
import { useLogin } from 'src/common/api/login/hooks';

const Center = styled(Box)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const ToyNetInput = styled(Input)`
  border: none;
  background-color: #212529;
`;

const ToyNetButton = styled(Button)`
  background-color: rgba(0,0,0,0);
  border: 1pt solid white;

  :hover {
    color: #212529;
  }
`;

const PasswordInput: FC<React.PropsWithChildren<InputProps<HTMLInputElement>>> = ({ ...rest }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <ToyNetInput
        pr="4.5rem"
        {...rest}
        type={show ? 'text' : 'password'}
      />
      <InputRightElement width="4.5rem">
        <ToyNetButton h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </ToyNetButton>
      </InputRightElement>
    </InputGroup>
  );
};

const Login = () => {
  const toast = useToast();
  const { dispatch } = useAuthContext();
  const [login, { data, isLoading, isSuccess, isError }] = useLogin();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    if (e.key === 'Enter')
      handleLogin();
  };

  const handleLogin = () => {
    if (username.length > 2 && password.length > 2) {
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
          <Heading textAlign='center'>Login to ToyNet!</Heading>
          <ToyNetInput
            placeholder='Username'
            type='text'
            autoComplete='username'
            onKeyPress={handleEnter}
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.currentTarget.value)}
          />
          <PasswordInput
            placeholder='Password'
            autoComplete='current-password'
            onKeyPress={handleEnter}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)}
          />
          <ToyNetButton onClick={handleLogin}>
            Sign In
          </ToyNetButton>
        </Stack>
        </form>
      </Center>
    </Box>
  );
};

export default Login;