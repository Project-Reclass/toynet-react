import React from 'react';
import renderer from 'react-test-renderer';

import Device from 'src/Emulator/Tabs/ConfigureTab/DeviceContainer/Device';

const defaultProps = {
  deviceName: 'Router',
  deviceData: {
    deviceName: 'test',
    connections: [],
  }
};

const routerConnectionsData = {
  deviceName: 'r1',
  connections: ['h1', 'h2', 'h3']
};

const hostConnections = {
  deviceName: 'h1',
  connections: ['r1', 'r2', 'r3']
};

const switchConnections = {
  deviceName: 's1',
  connections: ['s2', 's3', 's4']
};

describe('The Device', () => {
  it('should match previous snapshots', () => {
    const tree = renderer.create(<Device {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match previous snapshot with router connections', () => {
    const tree = renderer.create(<Device {...defaultProps} deviceData={routerConnectionsData} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match previous snapshots with host connections', () => {
    const tree = renderer.create(<Device {...defaultProps} deviceData={hostConnections} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match previous snapshots with switch connections', () => {
    const tree = renderer.create(<Device {...defaultProps} deviceData={switchConnections} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
  })
});