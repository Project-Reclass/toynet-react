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
import styled from '@emotion/styled';
import { Box, Link } from '@chakra-ui/core';

interface ModuleNameProps {
  locked: boolean;
  hoverColor?: string;
}

export const ModuleName = styled(Link)`
  color: ${({ locked }: ModuleNameProps) => locked ? 'grey' : 'white'};
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  a {
    -webkit-user-select: none;
    user-select: none;
  }
  :hover {
    color: ${({ hoverColor }: ModuleNameProps) => hoverColor || 'white'};
  }
`;

interface SIBoxProps {
  type: 'lock' | 'check';
}

export const StatusIconBox = styled(Box)`
  background-color: ${({type}: SIBoxProps) => type !== 'check' ? 'white' : 'rgb(79, 149, 26)'};
  border-radius: 3px;
  width: 1.5rem;
  height: 1.5rem;
`;