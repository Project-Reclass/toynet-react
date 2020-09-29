import React, { FC } from 'react';
import { useDrag } from 'react-dnd';
import styled from '@emotion/styled';

import { deviceColorClasses } from './shared';

type ConnectionTypes = 'r'| 's' | 'h'| string;

interface DeviceProps {
  isDragging: boolean;
  type: string;
}


export const Connection = styled.div`
  transition: 0.15s opacity ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30px;
  min-width: 30px;
  font-size: 0.6rem;
  margin-right: 5px;
  border-radius: 5px;
  color: white;
  text-transform: capitalize;
  cursor: pointer;

  background-color: ${({ type }: {type: ConnectionTypes}) => deviceColorClasses.get(type)};

  opacity: ${({ isDragging }: DeviceProps) => isDragging ? '0.2' : '1'};

  :hover {
    opacity: 0.2 !important;
  }
`;

interface Props {
  connection: string;
  idx: number;
}

const Link: FC<Props> = ({ connection, idx }) => {
  const [, drag] = useDrag({
    item: {
      type: 'device',
      deviceData: {
        name: connection,
        connections: [],
        isLink: true,
      },
    },
  });

  return (
    <Connection
      isDragging={false}
      ref={drag}
      key={`${connection}`}
      id={`${connection}${idx}`}
      type={connection[0].toLocaleLowerCase()}
      style={{ transform: 'rotateX(-180deg)' }}
    >
      {connection}
    </Connection>

    // <div
    //   id={`${connection}${idx}`}
    //   className={`connection ${deviceColorClasses.get(connection[0])}`}
    //   key={`${connection}`}
    //   style={{ cursor: 'pointer' }}
    //   ref={drag}
    // >
    //   {connection}
    // </div>
  );
};

export default Link;