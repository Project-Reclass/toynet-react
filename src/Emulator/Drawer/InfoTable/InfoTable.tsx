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
import { Box, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useEmulator } from 'src/common/providers/EmulatorProvider';

import HostRows from './HostRows';
import RouterRows from './RouterRows';
import SwitchRows from './SwitchRows/SwitchRows';

const Table = styled.table`
  border-radius: 5px;
  background-color: #212529;
  
  td, th {
    padding: 0.459rem;
  }
`;

interface Props {
  activeName?: string;
}

export default function InfoTable({ activeName }: Props) {
  const { switches, hosts, routers } = useEmulator();

  return (
    <Box>
      <Heading size='md' my={3}>Topology Information</Heading>
      <Table>
        <tbody>
          <HostRows routers={routers} hosts={hosts} activeName={activeName} />
          <SwitchRows switches={switches} activeName={activeName} />
          <RouterRows routers={routers} activeName={activeName} />
        </tbody>
      </Table>
    </Box>
  );
}