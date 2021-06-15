import React, { useCallback } from 'react';
import {
  Menu,
  Item,
} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

import { DeviceInterface } from 'src/common/types';
import EmulatorSection from 'src/common/components/Emulator/Section';

import { TopologyActions } from '../useTopology';

import Flow from './Flow';
import { InnerContainer } from './styled';
import { useEmulator } from '../EmulatorProvider';

interface Props {
  devices: DeviceInterface[],
}

const Menus = ({ devices }: Props) => {
  const { dispatch } = useEmulator();

  const handleDeleteConnections = useCallback((device: DeviceInterface) => {
    return () => {
      for (const conn of device.connections) {
        dispatch({
          type: TopologyActions.DELETE_CONNECTION,
          payload: {
            from: device.name,
            to: conn,
          },
        });
      }
    };
  }, [dispatch]);

  const handleDelete = useCallback((device: DeviceInterface) => {
    let deviceTypeAction = device.name[0].toLocaleLowerCase() === 'r' ? TopologyActions.DELETE_ROUTER :
                           device.name[0].toLocaleLowerCase() === 's' ? TopologyActions.DELETE_SWITCH :
                           device.name[0].toLocaleLowerCase() === 'h' ? TopologyActions.DELETE_HOST :
                           TopologyActions.FLUSH_QUEUE;
    return () => {
      for (const conn of device.connections) {
        dispatch({
          type: TopologyActions.DELETE_CONNECTION,
          payload: {
            from: device.name,
            to: conn,
          },
        });
      }
      dispatch({ type: deviceTypeAction, payload: device });
      dispatch({
        type: TopologyActions.DELETE_CONNECTION,
        payload: { to: device.name, from: device.name },
      });
    };
  }, [dispatch]);

  return (
    <>
    {devices.map(device => (
        <Menu id={`${device.name.toLocaleUpperCase()}-menu`} theme='dark' key={`${device.name}-menu`}>
          <Item onClick={handleDelete(device)}>
            Delete Node
          </Item>
          <Item onClick={handleDeleteConnections(device)}>
            Delete Connections
          </Item>
        </Menu>
      ))}
    </>
  );
};

const Visuals = () => {
  const { switches, routers, hosts } = useEmulator();
  return (
    <>
    <EmulatorSection padding='0.4vh'>
      <InnerContainer>
        <Flow
          hosts={hosts}
          routers={routers}
          switches={switches}
        />
      </InnerContainer>
    </EmulatorSection>
    <Menus devices={hosts} />
    <Menus devices={routers} />
    <Menus devices={switches} />
    </>
  );
};

export default Visuals;