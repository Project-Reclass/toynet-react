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
import { DeviceType } from 'src/common/types';

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
  ToyNetLinkRequest,
  ToyNetDeleteDeviceRequest,
} from './types';

const BASE_PATH = '/api/toynet';

interface StringMap {
  [key: string]: any;
}

/**
 * Recursively makes each string on an object to lower case.
 */
function makeToLowerCase(value: string | StringMap): string | StringMap {
  if (typeof value === 'string') {
    return value.toLowerCase();
  }

  const copy = JSON.parse(JSON.stringify(value));
  for (const key of Object.keys(copy)) {
    copy[key] = makeToLowerCase(copy[key]);
  }
  return copy;
}

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
      `${BASE_PATH}/session/${id}`, { toynet_command: makeToLowerCase(command) });
    return data;
  } catch (error) {
    throw new Error(
      (error as AxiosError).response?.data.message || 'Server error');
  }
};

export const deleteDevice = async (
  id: SessionId,
  deviceType: DeviceType,
  request: ToyNetDeleteDeviceRequest,
) => {
  try {
    const res = axios.put(
      `${BASE_PATH}/session/${id}/delete/${deviceType}`, makeToLowerCase(request));
    return res;
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
      `${BASE_PATH}/session/${id}/create/host`, makeToLowerCase(request));
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
      `${BASE_PATH}/session/${id}/create/router`, makeToLowerCase(request));
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
      `${BASE_PATH}/session/${id}/create/switch`, makeToLowerCase(request));
    return res;
  } catch (error) {
    throw new Error(
      (error as AxiosError).response?.data.message || 'Server error');
  }
};

export const createLink = async (
  id: SessionId,
  request: ToyNetLinkRequest,
) => {
  try {
    const res = await axios.put(
      `${BASE_PATH}/session/${id}/create/link`, makeToLowerCase(request));
    return res;
  } catch (error) {
    throw new Error(
      (error as AxiosError).response?.data.messages || 'Server error');
  }
};

export const deleteLink = async (
  id: SessionId,
  request: ToyNetLinkRequest,
) => {
  try {
    const res = await axios.put(
      `${BASE_PATH}/session/${id}/delete/link`, makeToLowerCase(request));
    return res;
  } catch (error) {
    throw new Error(
      (error as AxiosError).response?.data.messages || 'Server error');
  }
};

export const terminateToyNetSession = (
  id: SessionId,
) => {
  // We have to use a beacon here so that the requests get queued
  // doesn't get canceled when the user closes the browser.
  return navigator.sendBeacon(`/api/toynet/session/${id}/terminate`);
};