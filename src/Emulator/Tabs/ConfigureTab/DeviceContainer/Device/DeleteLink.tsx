import React, { FC } from 'react';
import { useDrop } from 'react-dnd';
import { Icon } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { Flex, Divider } from '@chakra-ui/core';

import { LinkFunc } from './shared';

const HoverableTrashCan = styled.div`
  margin: auto;

  > svg {
    transition: 0.15s opacity ease-in-out;
    opacity: ${({isHover}: {isHover: boolean}) => isHover ? '1' : '0.2'}
  }
`;

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
    <Flex marginLeft='auto' ref={drop} data-testid='trash-icon'>
      <Divider orientation='vertical' />
      <HoverableTrashCan isHover={isHover}>
        <Icon name='delete' size='1.2rem' focusable={true} />
      </HoverableTrashCan>
    </Flex>
  );
};

export default DeleteLink;