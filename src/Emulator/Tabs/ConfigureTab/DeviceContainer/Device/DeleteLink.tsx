import React, { FC } from 'react';
import { useDrop } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
      <FontAwesomeIcon icon={faTrashAlt} />
    </div>
  </div>
  );
};

export default DeleteLink;