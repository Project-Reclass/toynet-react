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

import React, { useEffect, useMemo, useRef } from 'react';
import { DeviceInterface } from 'src/common/types';
import { ActiveRow, DeviceName } from '../styled';

interface Props {
  activeName?: string;
  host: DeviceInterface;
  routers: DeviceInterface[];
}

export default function HostRow({
  activeName,
  routers,
  host: {
    ip,
    name,
    defaultGateway,
  },
}: Props) {
  const ref = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    console.log({ name, activeName });
    if (name === activeName) {
      ref.current?.scrollIntoView();
    }
  }, [activeName, name]);

  const intf = useMemo(() => {
    if (!defaultGateway)
      return '#.#.#.#';

    const router = routers.find(router => router.name === defaultGateway?.device);
    return router?.interfaces[defaultGateway.interface] || '#.#.#.#';
  }, [defaultGateway, routers]);

  return (
    <ActiveRow id={`${name}-info`} ref={ref} isActive={activeName === name}>
      <td>
        <DeviceName device='host'>
          {name.toUpperCase()}
        </DeviceName>
      </td>
      <td>{ip}</td>
      <td>{intf}</td>
    </ActiveRow>
  );
};