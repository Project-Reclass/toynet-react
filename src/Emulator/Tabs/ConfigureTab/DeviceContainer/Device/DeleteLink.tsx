import React, { FC } from 'react';
import { useDrop } from 'react-dnd';
import { Icon } from '@chakra-ui/core';

import { LinkFunc } from './shared';

interface Props {
  name: string;
  onRemove: LinkFunc;
}

const DeleteLink: FC<Props> = ({ name, onRemove }) => {
  const [{ isHover }, drop] = useDrop({
    accept: 'device',
    canDrop: (item: any) => {
      const { deviceData } = item;
      return deviceData.isLink || deviceData.connections.length === 0;
    },
    drop: (item: any, monitor) => {
      if (monitor.canDrop())
        onRemove(item.deviceData.name, name);
    },
    collect: (monitor) => {
      return {
        isHover: monitor.isOver() && monitor.canDrop(),
      };
    },
  });

  return (
    <div className={'trash-icon-container'} ref={drop} data-testid='trash-icon'>
    <div className="vertical-bar" />
    <div className={`trash-icon${isHover ? ' trash-icon__active' : ''}`}>
      <Icon name='delete' size='1.2rem' focusable={true} />
    </div>
  </div>
  );
};

export default DeleteLink;