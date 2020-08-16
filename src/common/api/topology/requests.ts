import axios from 'axios';

import { SessionRequest, SessionRequestResponse, SessionId, CommandRequest } from './types';

const BASE_PATH = '/api/toynet';

export const createToynetSession = async (request: SessionRequest) => {
  const { data } = await axios.post<SessionRequestResponse>(`${BASE_PATH}/session/create/`, request);
  return data;
};

export const getToynetSession = async (id: number) => {
  const { data } = await axios.get<Pick<SessionRequestResponse, 'topology'>>(`${BASE_PATH}/session/show/${id}`);
  return data;
};

export const updateToynetSession = async ({id, command}: CommandRequest) => {
  const { data} = await axios.post<Pick<SessionRequestResponse, 'message' | 'topology'>>(
    `${BASE_PATH}/session/modify/${id}/`,
    { command },
  );
  return data;
};

export const visualizeToynetSession = (id: SessionId): string => {
  return `${BASE_PATH}/session/visualize/${id}`;
};