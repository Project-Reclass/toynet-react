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