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

import React, { memo, useEffect, useRef } from 'react';
import { ActiveRow, DeviceName } from '../styled';

interface Props {
  activeName?: string;
  index: number;
  ip: string;
  intf: string;
  deviceName: string;
}

const InterfaceRow = memo(({
  activeName,
  index,
  intf,
  ip,
  deviceName,
}: Props) => {
  const ref = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (deviceName === activeName && index === 0)
      ref.current?.scrollIntoView();
  }, [activeName, deviceName, index]);

  return (
    <ActiveRow isActive={deviceName === activeName && index === 0} ref={ref}>
      <td>{index === 0 ?
        <DeviceName device='router'>
          {deviceName.toUpperCase()}
        </DeviceName> :
        ''
      }</td>
      <td>{intf}</td>
      <td>
        {index === 0 ? ip : ''}
      </td>
    </ActiveRow>
  );
});

export default InterfaceRow;