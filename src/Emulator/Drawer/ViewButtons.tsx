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

import React from 'react';
import { Button, Flex } from '@chakra-ui/core';

interface Props {
  isDisabled?: boolean;
  createName?: string;
  children?: React.ReactChild;
  onCreate?: () => any;
  onCancel?: () => any;
}

const ViewButtons = ({
  isDisabled,
  children,
  createName,
  onCreate,
  onCancel,
}: Props) => (
  <Flex justifyContent='space-between' marginY='1rem'>
    <Button
      onClick={onCreate}
      variantColor='teal'
      isDisabled={isDisabled}
    >{
      children ?
        children :
          createName ? `Create ${createName}` : 'Create'
    }</Button>
    <Button
      onClick={onCancel}
      variantColor='red'
      isDisabled={isDisabled}
    >
      Cancel
    </Button>
  </Flex>
);

export default ViewButtons;