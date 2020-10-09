import React, { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Divider, Flex } from '@chakra-ui/core';

import { mergeRefs } from 'src/common/utils';
import { DeviceInterface } from 'src/common/types';

import Link from './Link';
import { LinkFunc } from './shared';
import DeleteLink from './DeleteLink';
import { isValidLink } from './linkValidators';
import { Connection, ConnectionBox, ConnectionsContainer, DeviceBox } from './styled';

interface Props {
  deviceName: string;
  deviceData: DeviceInterface;
  onDrop: LinkFunc;
  onRemove: LinkFunc;
}

const Device: FC<Props> = ({ deviceData, onDrop, onRemove }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'device', deviceData: { ...deviceData, isLink: false } },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isHover }, drop] = useDrop({
    accept: 'device',
    drop: (item: any, monitor) => {
      if (monitor.canDrop()) {
        onDrop(item.deviceData.name, deviceData.name);
        return;
      }
    },
    canDrop: (item: any): boolean => {
      const { deviceData: fromDeviceData } = item;
      return isValidLink(fromDeviceData, {...deviceData});
    },
    collect: (monitor) => {
      return {
        isHover: monitor.isOver() && monitor.canDrop(),
      };
    },
  });

  return (
    <DeviceBox>
      <Flex>
        <Connection
          isHover={isHover}
          isDragging={isDragging}
          ref={mergeRefs([drag, drop])}
          isEmpty={deviceData.connections.length === 0}
          type={deviceData.name[0].toLocaleLowerCase()}
          size='large'
          style={{ margin: 'auto' }}
        >
          {deviceData.name}
        </Connection>
        <Divider orientation='vertical' />
      </Flex>
      <ConnectionsContainer>
        <div>Connections:</div>
        <ConnectionBox>
          {deviceData.connections.map((connection, idx) => (
            <Link key={connection} connection={connection }/>
          ))}
        </ConnectionBox>
      </ConnectionsContainer>
      <DeleteLink name={deviceData.name} onRemove={onRemove} />
    </DeviceBox>
  );
};

export default Device;
