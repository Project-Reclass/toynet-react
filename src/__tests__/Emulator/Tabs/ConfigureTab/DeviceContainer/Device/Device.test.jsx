import React, { useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import renderer from 'react-test-renderer';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { render, fireEvent, act } from '@testing-library/react';

import Device from 'src/Emulator/Tabs/ConfigureTab/DeviceContainer/Device';

function withDnDProvider(Component) {
  return (props) => (
    <DndProvider backend={HTML5Backend}>
      <Component {...props} />
    </DndProvider>
  )
}

const defaultProps = {
  deviceName: 'Router',
  deviceData: {
    name: 'test',
    connections: [],
  }
};

const TestComponent = withDnDProvider(Device);

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
    const tree = renderer.create(<TestComponent {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match previous snapshot with router connections', () => {
    const tree = renderer.create(<TestComponent {...defaultProps} deviceData={routerConnectionsData} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match previous snapshots with host connections', () => {
    const tree = renderer.create(<TestComponent {...defaultProps} deviceData={hostConnections} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match previous snapshots with switch connections', () => {
    const tree = renderer.create(<TestComponent {...defaultProps} deviceData={switchConnections} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
  });
});