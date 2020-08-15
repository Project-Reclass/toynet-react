import axios from 'axios';

import { SessionRequest, SessionRequestResponse, ToynetSessionResponse } from './types';

const BASE_PATH = '/api/toynet';

export const getBaseTopology = async (id: number) => {
  return createToynetSession({ toynet_id: id, user_id: 0 });
};

export const createToynetSession = async (request: SessionRequest) => {
  const { data } = await axios.post<SessionRequestResponse>(`${BASE_PATH}/session/create`, request);
  return data;
};

export const getToynetSession = async (id: number) => {
  const { data } = await axios.get<ToynetSessionResponse>(`${BASE_PATH}/session/show/${id}`);
  return data;
};