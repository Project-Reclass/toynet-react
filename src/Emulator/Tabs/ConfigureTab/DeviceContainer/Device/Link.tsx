import React, { FC } from 'react';
import { useDrag } from 'react-dnd';

import { deviceColorClasses } from './shared';

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
    <div
      id={`${connection}${idx}`}
      className={`connection ${deviceColorClasses.get(connection[0])}`}
      key={`${connection}`}
      style={{ cursor: 'pointer' }}
      ref={drag}
    >
      {connection}
    </div>
  );
};

export default Link;