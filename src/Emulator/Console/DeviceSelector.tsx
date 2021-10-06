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
import React, { memo } from 'react';
import { Select, Flex, Text } from '@chakra-ui/core';

interface Props {
  options: string[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const DeviceSelector = ({ onChange, options }: Props) => (
  <Flex width='fit-content' height='fit-content'>
    <Text my='auto' marginRight={2}>Device</Text>
    <Select
      size='sm'
      color='white'
      backgroundColor='#212529'
      placeholder='Select device'
      width='fit-content'
      borderWidth='1'
      borderRadius={3}
      onChange={onChange}
    >
      {options.map(option => (
        <option value={option}>{option.toUpperCase()}</option>
      ))}
    </Select>
  </Flex>
);

export default memo(DeviceSelector);