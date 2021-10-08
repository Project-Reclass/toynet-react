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

import { Box } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { DeviceType } from 'src/common/types';

export interface DeviceNameProps {
  device: DeviceType;
}

export const DeviceName = styled(Box)`
  background-color: ${({device}: DeviceNameProps) => device === 'host' ? 'rgb(158, 16, 89)' :
                      device === 'switch' ? 'rgb(0, 138, 158)' : 'rgb(189, 169, 19)'};
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 5px;
`;

export const ActiveRow = styled.tr`
  background-color: ${(props: {isActive: boolean}) => props.isActive && 'rgba(255,255,255,0.3)'};
`;