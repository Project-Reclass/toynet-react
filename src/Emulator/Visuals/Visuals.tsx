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
import 'react-contexify/dist/ReactContexify.css';

import EmulatorSection from 'src/common/components/Emulator/Section';

import { useEmulator } from '../EmulatorProvider';

import Flow from './Flow';
import { InnerContainer } from './styled';
import ContextMenus from './ContextMenus';

const Visuals = () => {
  const { switches, routers, hosts, sessionId } = useEmulator();
  return (
    <>
    <EmulatorSection padding='0.4vh'>
      <InnerContainer>
        <Flow
          sessionId={sessionId}
          hosts={hosts}
          routers={routers}
          switches={switches}
        />
      </InnerContainer>
    </EmulatorSection>
    <ContextMenus devices={hosts} />
    <ContextMenus devices={routers} />
    <ContextMenus devices={switches} />
    </>
  );
};

export default Visuals;