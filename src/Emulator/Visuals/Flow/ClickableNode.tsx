/*
Copyright (C) 1992-2021 Free Software Foundation, Inc.

This file is part of ToyNet React.

ToyNet React is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free
Software Foundation; either version 3, or (at your option) any later
version.

ToyNet React is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
for more details.

You should have received a copy of the GNU General Public License
along with ToyNet React; see the file LICENSE.  If not see
<http://www.gnu.org/licenses/>.

*/
import { Flex, Text } from '@chakra-ui/react';
import React, { memo, FC } from 'react';
import { useContextMenu } from 'react-contexify';
import { Handle, Position, NodeProps } from 'react-flow-renderer';


const ColorSelectorNode: FC<NodeProps> = ({ data }) => {
  const { show } = useContextMenu({
    id: `${data.label}-menu`,
  });

  const handleClick = (e: any) => {
    e.preventDefault();
    show(e);
  };

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Flex
        data-testid='clickable_node'
        margin='auto'
        onContextMenu={handleClick}
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