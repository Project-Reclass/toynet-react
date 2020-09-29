import React, { FC, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from '@emotion/styled';

import { mergeRefs } from 'src/common/utils';
import { DeviceInterface } from 'src/common/types';

import './Device.css';

import Link, { Connection } from './Link';
import DeleteLink from './DeleteLink';
import { isValidLink } from './linkValidators';
import { LinkFunc, DeviceColor, deviceColorClasses } from './shared';
import { Divider } from '@chakra-ui/core';

const ConnectionBox = styled.div`
  background-color: #212529;
  border-radius: 5px;
  padding: 0.45rem;
  padding-top: calc(0.45rem + 4px);
  display: flex;
  overflow-x: scroll;
  -ms-transform:rotateX(180deg); /* IE 9 */
  transform: rotateX(180deg); /* Safari and Chrome */
  -webkit-transform: rotateX(180deg);

  ::-webkit-scrollbar {
    height: 4px;
    color: #454950;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
`;

interface Props {
  deviceName: string;
  deviceData: DeviceInterface;
  onDrop: LinkFunc;
  onRemove: LinkFunc;
}

const Device: FC<Props> = ({ deviceName, deviceData, onDrop, onRemove }) => {
  const connections = useMemo(() => {
    return deviceData.connections.concat(deviceData.parent?.name || []);
  }, [deviceData.connections, deviceData.parent]);

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'device', deviceData: { ...deviceData, connections, isLink: false } },
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
      return isValidLink(fromDeviceData, {...deviceData, connections});
    },
    collect: (monitor) => {
      return {
        isHover: monitor.isOver() && monitor.canDrop(),
      };
    },
  });

  const deviceClassName = useMemo(() => {
    if (connections.length === 0)
      return DeviceColor.EMPTY;
    return deviceColorClasses.get(deviceName);
  }, [connections.length, deviceName]);

  return (
    <div className="device-box">
      <div style={{ display: 'flex' }}>
        <Connection
          isDragging={isDragging}
          ref={mergeRefs([drag, drop])}
          type={deviceData.name[0].toLocaleLowerCase()}
          style={{ width: '50px', height: '60px', margin: 'auto', fontSize: '1rem' }}
        >
          {deviceData.name}
        </Connection>
        {/* <div
          ref={mergeRefs([drag, drop])}
          className={`device-name-box ${deviceClassName}${isDragging ? ' is-dragging' : ''}${isHover ? ' is-hover' : ''}`}
        >
          {deviceData.name}
        </div> */}
        <Divider orientation='vertical' />
      </div>
      <div className="connections-container">
        <div>Connections:</div>
        <ConnectionBox>
          {connections.map((connection, idx) => (
            <Link key={connection} connection={connection} idx={idx} />
          ))}
        </ConnectionBox>
      </div>
      <DeleteLink name={deviceData.name} onRemove={onRemove} />
    </div>
  );
};

export default Device;
