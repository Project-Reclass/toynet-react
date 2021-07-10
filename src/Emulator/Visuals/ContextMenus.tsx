import React, { useCallback } from 'react';
import { Menu } from 'react-contexify';
import { Button, Stack } from '@chakra-ui/core';

import { DeviceInterface } from 'src/common/types';

import { TopologyActions } from '../useTopology';
import { useEmulator } from '../EmulatorProvider';

interface Props {
  devices: DeviceInterface[];
}

export const ContextMenus = ({ devices }: Props) => {
  const { dispatch } = useEmulator();

  const handleDeleteConnections = useCallback((from: string, to: string) => {
    return () => {
      dispatch({
        type: TopologyActions.DELETE_CONNECTION,
        payload: {
          to,
          from,
        },
      });
    };
  }, [dispatch]);

  const handleDelete = useCallback((device: DeviceInterface) => {
    let deviceTypeAction = device.name[0].toLocaleLowerCase() === 'r' ? TopologyActions.DELETE_ROUTER :
      device.name[0].toLocaleLowerCase() === 's' ? TopologyActions.DELETE_SWITCH :
        device.name[0].toLocaleLowerCase() === 'h' ? TopologyActions.DELETE_HOST :
          TopologyActions.FLUSH_QUEUE;

    if (deviceTypeAction === TopologyActions.FLUSH_QUEUE)
      throw new Error(`Invalid device name ${device.name}. Device names must start with (r|s|h).`);

    return () => {
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
          <Stack>
            <Button
              onClick={handleDelete(device)}
              isDisabled={device.connections.length !== 0}
              variant='ghost'
              variantColor='teal'
              alignContent='center'
              textAlign='left'
            >
              Delete Node
            </Button>
            {device.connections.map((to: string) => (
              <Button
                variant='ghost'
                variantColor='teal'
                textAlign='left'
                onClick={handleDeleteConnections(device.name, to)}
              >
                Delete {to.toLocaleUpperCase()} Connection
              </Button>
            ))}
          </Stack>
        </Menu>
      ))}
    </>
  );
};

export default ContextMenus;