import React from 'react';
import { DndProvider } from 'react-dnd';
import renderer, { act } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { HTML5Backend } from 'react-dnd-html5-backend';

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

const InteractionTestComponent = ({ deviceOne, deviceTwo }) => {
  return (
    <div>
      <TestComponent {...deviceOne} />
      <TestComponent {...deviceTwo} />
    </div>
  )
}

const onDropMock = jest.fn();

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

const routerDeviceMock = {
  deviceName: 'Router',
  deviceData: {
    name: 'router-one',
    type: 'router',
    connections: [],
  },
  onDrop: onDropMock,
}
const switchDeviceMock = {
  deviceName: 'Switch',
  deviceData: {
    name: 'switch-one',
    type: 'switch',
    connections: [],
  },
  onDrop: onDropMock,
}

const hostDeviceMock = {
  deviceName: 'Host',
  deviceData: {
    name: 'host-one',
    type: 'host',
    connections: [],
  },
  onDrop: onDropMock,
}

describe('The Device', () => {
  beforeEach(() => {
    onDropMock.mockClear();
  });

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

  it('should allow routers to connect switches', () => {
    const { getByText } = render(<InteractionTestComponent
      deviceOne={routerDeviceMock}
      deviceTwo={switchDeviceMock}
    />);

    const routerDevice = getByText('router-one');
    const switchDevice = getByText('switch-one');

    act(() => {
      fireEvent.dragStart(routerDevice);
      fireEvent.drag(routerDevice);
      fireEvent.dragOver(switchDevice);
      fireEvent.drop(switchDevice);
    });

    expect(onDropMock).toHaveBeenCalled();
  });

  it('should allow routers to connect to other routers', () => {
    const { getByText } = render(<InteractionTestComponent
      deviceOne={routerDeviceMock}
      deviceTwo={{...routerDeviceMock, deviceData: { ...routerDeviceMock.deviceData, name: 'router-two' }}}
    />);

    const routerDevice = getByText('router-one');
    const switchDevice = getByText('router-two');

    act(() => {
      fireEvent.dragStart(routerDevice);
      fireEvent.drag(routerDevice);
      fireEvent.dragOver(switchDevice);
      fireEvent.drop(switchDevice);
    });

    expect(onDropMock).toHaveBeenCalled();
  });

  it('should not allow routers to connect to hosts', () => {
    const { getByText } = render(<InteractionTestComponent
      deviceOne={routerDeviceMock}
      deviceTwo={hostDeviceMock}
    />);

    const routerDevice = getByText('router-one');
    const hostDevice = getByText('host-one');

    act(() => {
      fireEvent.dragStart(routerDevice);
      fireEvent.drag(routerDevice);
      fireEvent.dragOver(hostDevice);
      fireEvent.drop(hostDevice);
    });

    expect(onDropMock).not.toHaveBeenCalled();
  });

  it('should allow switches to connect to routers', () => {
    const { getByText } = render(<InteractionTestComponent
      deviceOne={switchDeviceMock}
      deviceTwo={routerDeviceMock}
    />);

    const routerDevice = getByText('router-one');
    const switchDevice = getByText('switch-one');

    act(() => {
      fireEvent.dragStart(switchDevice);
      fireEvent.drag(switchDevice);
      fireEvent.dragOver(routerDevice);
      fireEvent.drop(routerDevice);
    });

    expect(onDropMock).toHaveBeenCalled();
  });

  it('should allow switches to connect other switches', () => {
    const { getByText } = render(<InteractionTestComponent
      deviceOne={switchDeviceMock}
      deviceTwo={{...switchDeviceMock, deviceData: { ...switchDeviceMock.deviceData, name: 'switch-two' }}}
    />);

    const switchTwoDevice = getByText('switch-two');
    const switchDevice = getByText('switch-one');

    act(() => {
      fireEvent.dragStart(switchDevice);
      fireEvent.drag(switchDevice);
      fireEvent.dragOver(switchTwoDevice);
      fireEvent.drop(switchTwoDevice);
    });

    expect(onDropMock).toHaveBeenCalled();
  });

  it('should allow switches to connect to hosts', () => {
    const { getByText } = render(<InteractionTestComponent
      deviceOne={switchDeviceMock}
      deviceTwo={hostDeviceMock}
    />);

    const switchDevice = getByText('switch-one');
    const hostDevice = getByText('host-one');

    act(() => {
      fireEvent.dragStart(switchDevice);
      fireEvent.drag(switchDevice);
      fireEvent.dragOver(hostDevice);
      fireEvent.drop(hostDevice);
    });

    expect(onDropMock).toHaveBeenCalled();
  });

  it('should allow hosts to connect to switches', () => {
    const { getByText } = render(<InteractionTestComponent
      deviceOne={hostDeviceMock}
      deviceTwo={switchDeviceMock}
    />);

    const hostDevice = getByText('host-one');
    const switchDevice = getByText('switch-one');

    act(() => {
      fireEvent.dragStart(hostDevice);
      fireEvent.drag(hostDevice);
      fireEvent.dragOver(switchDevice);
      fireEvent.drop(switchDevice);
    });

    expect(onDropMock).toHaveBeenCalled();
  });

  it('should not allow hosts to connect to other hosts', () => {
    const { getByText } = render(<InteractionTestComponent
      deviceOne={hostDeviceMock}
      deviceTwo={{...hostDeviceMock, deviceData: { ...hostDeviceMock.deviceData, name: 'host-two' }}}
    />);

    const hostDevice = getByText('host-one');
    const hostTwoDevice = getByText('host-two');

    act(() => {
      fireEvent.dragStart(hostDevice);
      fireEvent.drag(hostDevice);
      fireEvent.dragOver(hostTwoDevice);
      fireEvent.drop(hostTwoDevice);
    });

    expect(onDropMock).not.toHaveBeenCalled();
  });

  it('should not allow hosts to connect to a router', () => {
    const { getByText } = render(<InteractionTestComponent
      deviceOne={hostDeviceMock}
      deviceTwo={routerDeviceMock}
    />);

    const hostDevice = getByText('host-one');
    const routerDevice = getByText('router-one');

    act(() => {
      fireEvent.dragStart(hostDevice);
      fireEvent.drag(hostDevice);
      fireEvent.dragOver(routerDevice);
      fireEvent.drop(routerDevice);
    });

    expect(onDropMock).not.toHaveBeenCalled();
  });

  // it('should only allow a host to have one connection', () => {
  //   const { getByText } = render(<InteractionTestComponent
  //     deviceOne={{...hostDeviceMock, deviceData: { ...hostDeviceMock.deviceData, connections: ['s1'] }}}
  //     deviceTwo={switchDeviceMock}
  //   />);

  //   const hostDevice = getByText('host-one');
  //   const switchDevice = getByText('switch-one');

  //   act(() => {
  //     fireEvent.dragStart(hostDevice);
  //     fireEvent.drag(hostDevice);
  //     fireEvent.dragOver(switchDevice);
  //     fireEvent.drop(switchDevice);
  //   });

  //   expect(onDropMock).not.toHaveBeenCalled();
  // });
});