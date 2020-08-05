export type DeviceType = 'router' | 'switch' | 'host';

export interface DeviceInterface {
  name: string;
  type: DeviceType;
  connections: string[];
}