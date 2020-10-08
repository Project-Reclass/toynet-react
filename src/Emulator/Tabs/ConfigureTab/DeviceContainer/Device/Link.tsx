import React, { FC } from 'react';
import { useDrag } from 'react-dnd';

import { Connection } from './styled';

interface Props {
  connection: string;
}

const Link: FC<Props> = ({ connection }) => {
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
      id={`${connection}`}
      type={connection[0].toLocaleLowerCase()}
      style={{ transform: 'rotateX(-180deg)' }}
    >
      {connection}
    </Connection>
  );
};

export default Link;