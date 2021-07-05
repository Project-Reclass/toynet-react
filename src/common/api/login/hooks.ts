import { useMutation } from 'react-query';

import { login } from './requests';

export type PromiseFunction<T> = () => Promise<T>;

export function useLogin() {
  return useMutation(login);
}