export type DeviceType = 'router' | 'switch' | 'host';

export interface DeviceInterface {
  name: string;
  type: DeviceType;
  parent: DeviceInterface | null;
  connections: string[];
}

export type StateHook<T> = [
  T,
  (value: T) => void,
]

export type AsyncStateHook<T> = [
  T,
  (value: T) => void,
  boolean,
];

export interface Action<TActions, TPayload> {
  type: TActions;
  payload: TPayload;
}

export type ReducerFn<T> = (action: T) => void;
export type GenericFunction = () => any;