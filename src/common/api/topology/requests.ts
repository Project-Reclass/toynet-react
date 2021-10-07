/*
Copyright (C) 1992-2021 Free Software Foundation, Inc.

This file is part of ToyNet React.

ToyNet React is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free
Software Foundation; either version 3, or (at your option) any later
version.

ToyNet React is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
for more details.

You should have received a copy of the GNU General Public License
along with ToyNet React; see the file LICENSE.  If not see
<http://www.gnu.org/licenses/>.

*/
import axios, { AxiosError } from 'axios';

import {
  SessionRequest,
  SessionRequestResponse,
  CommandRequest,
  ToynetSession,
  ToynetCommandResponse,
  SessionId,
  ToyNetCreateHostRequest,
  ToyNetCreateRouterRequest,
  ToyNetCreateSwitchRequest,
} from './types';

const BASE_PATH = '/api/toynet';

export const createToynetSession = async (request: SessionRequest) => {
  const { data } = await axios.post<SessionRequestResponse>(
    `${BASE_PATH}/session`, request);
  return data;
};

export const getToynetSession = async (id: number) => {
  const { data } = await axios.get<ToynetSession>(`${BASE_PATH}/session/${id}`);
  return data;
};

export const updateToynetSession = async ({id, command}: CommandRequest): Promise<object> => {
  try {
    const { data } = await axios.put(
      `${BASE_PATH}/session/${id}`,
      { command },
    );
    return data;
  } catch (error) {
    throw new Error((error as any).response.data.message);
  }
};

export const runToynetCommand = async(id: SessionId, command: string) => {
  try {
    const { data } = await axios.post<ToynetCommandResponse>(
      `${BASE_PATH}/session/${id}`, { toynet_command: command });
    return data;
  } catch (error) {
    throw new Error(
      (error as AxiosError).response?.data.message || 'Server error');
  }
};

export const createHost = async (
  id: SessionId,
  request: ToyNetCreateHostRequest,
) => {
  try {
    const res = await axios.put(
      `${BASE_PATH}/session/${id}/create/host`, request);
    return res;
  } catch (error) {
    throw new Error(
      (error as AxiosError).response?.data.message || 'Server error');
  }
};

export const createRouter = async (
  id: SessionId,
  request: ToyNetCreateRouterRequest,
) => {
  try {
    const res = await axios.put(
      `${BASE_PATH}/session/${id}/create/router`, request);
    return res;
  } catch (error) {
    throw new Error(
      (error as AxiosError).response?.data.message || 'Server error');
  }
};

export const createSwitch = async (
  id: SessionId,
  request: ToyNetCreateSwitchRequest,
) => {
  try {
    const res = await axios.put(
      `${BASE_PATH}/session/${id}/create/switch`, request);
    return res;
  } catch (error) {
    throw new Error(
      (error as AxiosError).response?.data.message || 'Server error');
  }
};