/* eslint-disable no-magic-numbers */
import { Flex, Text } from '@chakra-ui/core';
import React, { memo, FC } from 'react';
import { useContextMenu } from 'react-contexify';
import { Handle, Position, NodeProps } from 'react-flow-renderer';


const ColorSelectorNode: FC<NodeProps> = ({ data }) => {
  const { show } = useContextMenu({
    id: `${data.label}-menu`,
  });

  const handleStuff = (e: any) => {
    e.preventDefault();
    show(e);
  };

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Flex
        margin='auto'
        onContextMenu={handleStuff}
        flex='1 1 auto'
        height='100%'
      >
        <Text
          margin='auto'
        >
          {data.label}
        </Text>
      </Flex>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default memo(ColorSelectorNode);