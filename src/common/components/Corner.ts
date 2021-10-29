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

export const Corner = styled.div`
  height: 19px;
  width: 30px;
  border-bottom-width: 2px;
  border-left-width: 2px;
  border-bottom-style: solid;
  border-bottom-left-radius: 10px;
  border-color: white;

  // used to offset the border so that there is overlap between the left border and the border for hte modules
  transform: ${({ isLast: showLeft }: {isLast: boolean}) => !showLeft ? 'translateX(-2px);' : ''};
`;

export default Corner;
