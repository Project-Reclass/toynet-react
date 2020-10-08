import React from 'react';
import { DndProvider } from 'react-dnd';
import renderer, { act } from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Device from 'src/Emulator/Tabs/ConfigureTab/DeviceContainer/Device';
import { renderTreeWithTheme, renderWithTheme } from 'src/common/test-utils/renderWithTheme';

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
const onRemoveMock = jest.fn();

const routerConnectionsData = {
  name: 'r1',
  connections: ['h1', 'h2', 'h3']
};

const hostConnections = {
  name: 'h1',
  connections: ['r1', 'r2', 'r3']
};

const switchConnections = {
  name: 's1',
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
  onRemove: onRemoveMock,
}
const switchDeviceMock = {
  deviceName: 'Switch',
  deviceData: {
    name: 'switch-one',
    type: 'switch',
    connections: [],
  },
  onDrop: onDropMock,
  onRemove: onRemoveMock,
}

const hostDeviceMock = {
  deviceName: 'Host',
  deviceData: {
    name: 'host-one',
    type: 'host',
    connections: [],
  },
  onDrop: onDropMock,
  onRemove: onRemoveMock,
}

describe('The Device', () => {
  beforeEach(() => {
    onDropMock.mockClear();
    onRemoveMock.mockClear();
  });

  it('should match previous snapshots', () => {
    const tree = renderTreeWithTheme(<TestComponent {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match previous snapshot with router connections', () => {
    const tree = renderTreeWithTheme(<TestComponent {...defaultProps} deviceData={routerConnectionsData} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match previous snapshots with host connections', () => {
    const tree = renderTreeWithTheme(<TestComponent {...defaultProps} deviceData={hostConnections} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match previous snapshots with switch connections', () => {
    const tree = renderTreeWithTheme(<TestComponent {...defaultProps} deviceData={switchConnections} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be able to delete connection', () => {
    const { getByText, getByTestId } = renderWithTheme(<TestComponent
      {...hostDeviceMock}
      deviceData={{
        ...hostDeviceMock.deviceData,
        connections: ['h1-conn']
      }}
    />);

    const connection = getByText('h1-conn');
    const trash = getByTestId('trash-icon');

    act(() => {
      fireEvent.dragStart(connection);
      fireEvent.drag(connection);
      fireEvent.dragOver(trash);
      fireEvent.drop(trash);
    });

    expect(onRemoveMock).toHaveBeenCalled();
  });

  it('should be able to delete itself with no connections', () => {
    const { getByText, getByTestId } = renderWithTheme(<TestComponent {...hostDeviceMock} />);

    const device = getByText(hostDeviceMock.deviceData.name);
    const trash = getByTestId('trash-icon');

    act(() => {
      fireEvent.dragStart(device);
      fireEvent.drag(device);
      fireEvent.dragOver(trash);
      fireEvent.drop(trash);
    });

    expect(onRemoveMock).toHaveBeenCalled();
  });

  it('should not delete itself when it still has connections', () => {
    const { getByText, getByTestId } = renderWithTheme(<TestComponent
      {...hostDeviceMock}
      deviceData={{
        ...hostDeviceMock.deviceData,
        connections: ['h1-conn']
      }}
    />);

    const connection = getByText(hostDeviceMock.deviceData.name);
    const trash = getByTestId('trash-icon');

    act(() => {
      fireEvent.dragStart(connection);
      fireEvent.drag(connection);
      fireEvent.dragOver(trash);
      fireEvent.drop(trash);
    });

    expect(onRemoveMock).not.toHaveBeenCalled();
  });

  describe('routers', () => {
    it('should be able to connect to switches', () => {
      const { getByText } = renderWithTheme(<InteractionTestComponent
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
  
    it('should be able to connect to other routers', () => {
      const { getByText } = renderWithTheme(<InteractionTestComponent
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

    it('should not be able to connect to a device already connected to it', () => {
      const { getByText, getAllByText } = renderWithTheme(<InteractionTestComponent
        deviceOne={routerDeviceMock}
        deviceTwo={{...switchDeviceMock, deviceData: {...switchDeviceMock.deviceData, connections: ['router-one']}}}
      />);
  
      const routerDevice = getAllByText('router-one');
      const switchDevice = getByText('switch-one');
  
      act(() => {
        fireEvent.dragStart(routerDevice[0]);
        fireEvent.drag(routerDevice[0]);
        fireEvent.dragOver(switchDevice);
        fireEvent.drop(switchDevice);
      });
  
      expect(onDropMock).not.toHaveBeenCalled();
    });

    it('should not be able to connect to hosts', () => {
      const { getByText } = renderWithTheme(<InteractionTestComponent
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
  });

  describe('switches', () => {
    it('should be able to connect to routers', () => {
      const { getByText } = renderWithTheme(<InteractionTestComponent
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
  
    // it('should be able to connect other switches', () => {
    //   const { getByText } = render(<InteractionTestComponent
    //     deviceOne={switchDeviceMock}
    //     deviceTwo={{...switchDeviceMock, deviceData: { ...switchDeviceMock.deviceData, name: 'switch-two' }}}
    //   />);
  
    //   const switchTwoDevice = getByText('switch-two');
    //   const switchDevice = getByText('switch-one');
  
    //   act(() => {
    //     fireEvent.dragStart(switchDevice);
    //     fireEvent.drag(switchDevice);
    //     fireEvent.dragOver(switchTwoDevice);
    //     fireEvent.drop(switchTwoDevice);
    //   });
  
    //   expect(onDropMock).toHaveBeenCalled();
    // });
  
    it('should be able to connect to hosts', () => {
      const { getByText } = renderWithTheme(<InteractionTestComponent
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

    it('should not be able to connect to hosts if they already have a connection', () => {
      const { getByText } = renderWithTheme(<InteractionTestComponent
        deviceOne={switchDeviceMock}
        deviceTwo={{...hostDeviceMock, deviceData: {...hostDeviceMock.deviceData, connections: ['r1']}}}
      />);
  
      const switchDevice = getByText('switch-one');
      const hostDevice = getByText('host-one');
  
      act(() => {
        fireEvent.dragStart(switchDevice);
        fireEvent.drag(switchDevice);
        fireEvent.dragOver(hostDevice);
        fireEvent.drop(hostDevice);
      });
  
      expect(onDropMock).not.toHaveBeenCalled();
    });

    it('should not be able to connect to a device already connected', () => {
      const { getByText, getAllByText } = renderWithTheme(<InteractionTestComponent
        deviceOne={switchDeviceMock}
        deviceTwo={{...routerDeviceMock, deviceData: {...routerDeviceMock.deviceData, connections: ['switch-one']}}}
      />);
  
      const routerDevice = getByText('router-one');
      const switchDevice = getAllByText('switch-one');
  
      act(() => {
        fireEvent.dragStart(switchDevice[0]);
        fireEvent.drag(switchDevice[0]);
        fireEvent.dragOver(routerDevice);
        fireEvent.drop(routerDevice);
      });
  
      expect(onDropMock).not.toHaveBeenCalled();
    });
  });

  describe('hosts', () => {
    it('should be able to connect to switches', () => {
      const { getByText } = renderWithTheme(<InteractionTestComponent
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
  
    it('should not be able to connect to other hosts', () => {
      const { getByText } = renderWithTheme(<InteractionTestComponent
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
  
    it('should not be able to connect to a router', () => {
      const { getByText } = renderWithTheme(<InteractionTestComponent
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
  
    it('should be able to have one connection', () => {
      const { getByText } = renderWithTheme(<InteractionTestComponent
        deviceOne={{...hostDeviceMock, deviceData: { ...hostDeviceMock.deviceData, connections: ['s1'] }}}
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
  
      expect(onDropMock).not.toHaveBeenCalled();
    });

    it('should not be able to connect to a device already connected', () => {
      const { getByText, getAllByText } = renderWithTheme(<InteractionTestComponent
        deviceOne={hostDeviceMock}
        deviceTwo={{...routerDeviceMock, deviceData: {...routerDeviceMock.deviceData, connections: ['host-one']}}}
      />);
  
      const hostDevice = getAllByText('host-one');
      const switchDevice = getByText('router-one');
  
      act(() => {
        fireEvent.dragStart(hostDevice[0]);
        fireEvent.drag(hostDevice[0]);
        fireEvent.dragOver(switchDevice);
        fireEvent.drop(switchDevice);
      });
  
      expect(onDropMock).not.toHaveBeenCalled();
    });
  });
});