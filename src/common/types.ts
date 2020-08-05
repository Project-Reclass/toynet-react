export type DeviceType = 'router' | 'switch' | 'host' | 'link';

export interface DeviceInterface {
  name: string;
  type: DeviceType;
  connections: string[];
}