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
import { Icon } from '@chakra-ui/core';

export const DropdownContainer = styled.div`
  font-size: 1.5rem;
  box-shadow:  0pt 0px 3px rgba(0, 0, 0, 0.3);
  color: white;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.05);

  display: grid;
  grid-template-columns: 40px 1fr 1fr;
  margin: 0.229rem;

  > span {
    margin: auto 0.5rem;
    text-align: center;
    user-select: none;
  }
`;

interface RotatableArrowProps {
  rotated: boolean;
}

export const RotatableArrow = styled.span`
  display: block;
  cursor: pointer;

  transition: 0.3s ease;
  transform-origin: 50% 65% 0;

  transform: ${({ rotated }: RotatableArrowProps) => rotated && 'rotate(180deg)'};
`;

export const RotatableIcon = styled(Icon)`
  transition: 0.3s ease;
  cursor: pointer;

  transform: ${({ rotated }: RotatableArrowProps) => rotated && 'rotate(180deg)'};
`;
