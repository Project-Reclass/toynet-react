import axios from 'axios';

import { SessionRequest, SessionRequestResponse, CommandRequest, ToynetSession } from './types';

const BASE_PATH = '/api/toynet';

export const createToynetSession = async (request: SessionRequest) => {
  const { data } = await axios.post<SessionRequestResponse>(`${BASE_PATH}/session`, request);
  return data;
};

export const getToynetSession = async (id: number) => {
  const { data } = await axios.get<ToynetSession>(`${BASE_PATH}/session/${id}`);
  return data;
};

export const updateToynetSession = async ({id, command}: CommandRequest) => {
  const { data} = await axios.put(
    `${BASE_PATH}/session/${id}`,
    { command },
  );
  return data;
};
