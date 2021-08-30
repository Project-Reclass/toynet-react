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
<http://www.gnu.org/licenses/>.  */
import styled from '@emotion/styled';

interface Props {
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  padding?: string
}

const EmulatorSection = styled.div`
  color: white;
  background-color: #454950;
  height: ${(props: Props) => props.height || '100%'};
  width: ${(props: Props) => props.width || '100%'};
  border-radius: 10px;
  padding: ${(props: Props) => props.padding || '2vh'};
  display: flex;
  flex-direction: column;
  min-width: ${(props: Props) => props.minWidth};
  max-width: ${(props: Props) => props.maxWidth};
`;

export default EmulatorSection;