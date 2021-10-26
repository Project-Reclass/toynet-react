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
import { Button } from '@chakra-ui/react';
import { useDrawer } from 'src/common/providers/DrawerProvider';
import { DeviceInterface } from 'src/common/types';

interface Props {
  device: Pick<DeviceInterface, 'name'>;
}

export default function InfoBtn({
  device: {
    name,
  },
}: Props) {
  const { setInfoView } = useDrawer();

  const handleClick = () =>
    setInfoView(name);

  return (
    <Button
      data-testid='info-btn'
      onClick={handleClick}
      variant='ghost'
      colorScheme='teal'
      alignContent='center'
      textAlign='left'
    >
      More Info
    </Button>
  );
}