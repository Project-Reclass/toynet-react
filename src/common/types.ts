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
export type DeviceType = 'router' | 'switch' | 'host';

export interface DefaultGateway {
  device: string;
  interface: number;
}

export interface DeviceInterface {
  ip?: string;
  defaultGateway?: {
    device: string;
    interface: number;
  };
  interfaces: string[];
  name: string;
  type: DeviceType;
  connections: string[];
}

export type StateHook<T> = [T, (value: T) => void];

export type UpdateValFunc<TValue> = (value: TValue) => TValue;

export type AsyncStateHook<T> =
  [T, (value: T | UpdateValFunc<T>) => void, boolean];

export function isUpdateValueFunc<T>(arg: any): arg is UpdateValFunc<T> {
  return arg !== undefined && typeof arg === 'function';
}
export interface Action<TActions, TPayload> {
  type: TActions;
  payload?: TPayload;
}

export type ReducerFn<T> = (action: T) => void;
export type GenericFunction = () => any;

export interface StringMap {
  [key: string]: boolean;
}

export type DialogueMessageId = string;
export interface DialogueMessage {
  id: DialogueMessageId;
  message: string,
  color: string
}

export interface Video {
  title: string;
  url: string;
  description: string;
}