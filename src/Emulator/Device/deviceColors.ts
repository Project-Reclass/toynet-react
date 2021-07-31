import { DeviceType } from 'src/common/types';

export type LinkFunc = (from: string, to: string) => any;

export enum DeviceColor {
  EMPTY = '#707070',
  ROUTER = '#BDA913',
  SWITCH = '#008A9E',
  HOST = '#9E1059',
}

export const deviceColorClasses = new Map<DeviceType | 'empty', DeviceColor>();
deviceColorClasses.set('router', DeviceColor.ROUTER);
deviceColorClasses.set('switch', DeviceColor.SWITCH);
deviceColorClasses.set('host', DeviceColor.HOST);
deviceColorClasses.set('empty', DeviceColor.EMPTY);