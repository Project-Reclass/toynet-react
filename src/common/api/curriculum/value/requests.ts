import axios from 'axios';
import { authorizedRequest } from '../../login/requests';

export interface Meta {
  value: string;
  inspiration: {
    organization: string;
    definition: string;
  }[];
}

interface Quote {
  quote: string;
}
interface QuoteResponse {
  entry: string;
}
export const getValueMeta = async (valueId: number): Promise<Meta> => {
  const { data } = await axios.get(`/api/value/${valueId}/inspirations`);
  return data;
};

export const buildUpdateUserValue = (valueId: number, token: string) => {
  return (quote: Quote) => authorizedRequest(`/api/value/${valueId}/entry`, 'PUT', token, quote);
};

export const getUserValue = async (valueId: number, { token }: {token: string}) => {
  const res = await authorizedRequest<QuoteResponse>(`/api/value/${valueId}/entry`, 'GET', token);
  if (res.statusText !== 'OK')
    throw new Error('User value response not ok');

  return res;
};
