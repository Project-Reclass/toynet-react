import { useMutation } from 'react-query';

import { login } from './requests';

export function useLogin() {
  return useMutation(login);
}