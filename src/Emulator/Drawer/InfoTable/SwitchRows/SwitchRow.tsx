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
import React, { useEffect, useRef } from 'react';

import { ActiveRow, DeviceName } from '../styled';

interface RowProps {
  name: string;
  activeName?: string;
}

const SwitchRow = ({ name, activeName }: RowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (activeName === name)
      ref.current?.scrollIntoView();
  }, [activeName, name]);

  return (
    <ActiveRow ref={ref} isActive={activeName === name}>
      <td>
        <DeviceName device='switch'>
          {name.toUpperCase()}
        </DeviceName>
      </td>
      <td></td>
      <td></td>
    </ActiveRow>
  );
};

export default SwitchRow;