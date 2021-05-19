import React from 'react';

import EmulatorSection from 'src/common/components/Emulator/Section';

import Flow from './Flow';
import { InnerContainer } from './styled';
import { useEmulator } from '../EmulatorProvider';

const Visuals = () => {
  const { switches, routers, hosts } = useEmulator();
  return (
    <EmulatorSection padding='0.4vh'>
      <InnerContainer>
        <Flow
          hosts={hosts}
          routers={routers}
          switches={switches}
        />
      </InnerContainer>
    </EmulatorSection>
  );
};

export default Visuals;