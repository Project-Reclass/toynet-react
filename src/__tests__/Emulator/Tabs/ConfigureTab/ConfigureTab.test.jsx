import React from 'react';

jest.mock('src/common/api/topology/requests')
import ConfigureTab, { getNextDeviceName, getNextNumber } from 'src/Emulator/Tabs/ConfigureTab';
import { render, act, fireEvent } from '@testing-library/react';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';

describe('ConfigureTab helper functions', () => {
  it('should increment numbers correctly', () => {
    const randomInt = Math.floor(Math.random() * 10) + 1;

    expect(getNextNumber(`r${randomInt}`)).toEqual(randomInt + 1);
    expect(getNextNumber(`s${randomInt}`)).toEqual(randomInt + 1);
    expect(getNextNumber(`h${randomInt}`)).toEqual(randomInt + 1);
  });

  it('should increment device names correctly', () => {
    const testRouter = [{ name: "r1", connections: [] }];
    const testSwitch = [{ name: "s1", connections: [] }];
    const testHost = [{ name: "h1", connections: [] }];

    expect(getNextDeviceName(testRouter, "r")).toEqual("r2");
    expect(getNextDeviceName(testSwitch, "s")).toEqual("s2");
    expect(getNextDeviceName(testHost, "h")).toEqual("h2");
  });

  it('should handle empty initial configs correctly', () => {
    const emptyConfig = [];

    expect(getNextDeviceName(emptyConfig, "r")).toEqual("r1");
    expect(getNextDeviceName(emptyConfig, "s")).toEqual("s1");
    expect(getNextDeviceName(emptyConfig, "h")).toEqual("h1");
  });
});

describe('ConfigureTab', ()=> {
  it('should match previous snapshots', () => {
    const { container } = renderWithTheme(<ConfigureTab status={'online'} />);
    expect(container).toMatchSnapshot();
  });
});