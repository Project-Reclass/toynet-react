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

import React, { memo } from 'react';
import { DeviceInterface } from 'src/common/types';

import SwitchRow from './SwitchRow';

interface Props {
  activeName?: string;
  switches: DeviceInterface[];
}

const SwitchRows = memo(({ switches, activeName }: Props) => (
  <>
    {switches.map(({ name }) => (
      <SwitchRow name={name} activeName={activeName} />
    ))}
  </>
));

export default SwitchRows;