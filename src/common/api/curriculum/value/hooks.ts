import { useQuery } from 'react-query';

import { getValueMeta } from './requests';


export function useValueMeta(valueId: number) {
  return useQuery(['value-meta', { valueId }], (_, { valueId }) => getValueMeta(valueId));
}