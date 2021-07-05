import { queryCache, useMutation, useQuery } from 'react-query';
import useAuthState from 'src/Login/AuthProvider/useAuthState';

import { getValueMeta, buildUpdateUserValue, getUserValue } from './requests';

export function useValueMeta(valueId: number) {
  return useQuery(['value-meta', { valueId }],
    (_, { valueId }) => getValueMeta(valueId));
}

export function useUpdateValueEntry(valueId: number) {
  const [state] = useAuthState();
  return useMutation(buildUpdateUserValue(valueId, state.token), {
    onSuccess: () => {
      queryCache.invalidateQueries(['value-entry', {
        valueId,
        token: state.token,
      }]);
    },
  });
}

export function useValueEntry(valueId: number) {
  const [state] = useAuthState();
  return useQuery(['value-entry', { valueId, token: state.token }],
    (_, {valueId}) => getUserValue(valueId, state), {retry: false});
}