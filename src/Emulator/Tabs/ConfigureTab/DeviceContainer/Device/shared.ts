export type LinkFunc = (from: string, to: string) => any;

export enum DeviceColor {
  EMPTY = '#707070',
  ROUTER = '#BDA913',
  SWITCH = '#008A9E',
  HOST = '#9E1059',
}

export const deviceColorClasses = new Map<string, DeviceColor>();
deviceColorClasses.set('Router', DeviceColor.ROUTER);
deviceColorClasses.set('r', DeviceColor.ROUTER);
deviceColorClasses.set('Switch', DeviceColor.SWITCH);
deviceColorClasses.set('s', DeviceColor.SWITCH);
deviceColorClasses.set('Host', DeviceColor.HOST);
deviceColorClasses.set('h', DeviceColor.HOST);
deviceColorClasses.set('empty', DeviceColor.EMPTY);