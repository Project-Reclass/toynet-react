import axios from 'axios';

import { TopologyResponse, SessionRequest, SessionRequestResponse, ToynetSessionResponse } from './types';

const BASE_PATH = '/api/toynet';

export const getBaseTopology = async (id: number) => {
  const { data } = await axios.get<TopologyResponse>(`${BASE_PATH}/config/show/${id}/`);
  return data;
};

export const createToynetSession = async (request: SessionRequest) => {
  const { data } = await axios.post<SessionRequestResponse>(`${BASE_PATH}/session/create`, request);
  return data;
};

export const getToynetSession = async (id: number) => {
  const { data } = await axios.get<ToynetSessionResponse>(`${BASE_PATH}/session/show/${id}`);
  return data;
};