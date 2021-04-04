import React from 'react';

import { OuterContainer, InnerContainer } from './styled';
import Flow from './Flow';
import { useEmulator } from '../EmulatorProvider';

const Visuals = () => {
  const { switches, routers, hosts } = useEmulator();
  return (
    <OuterContainer>
      <InnerContainer>
        <Flow
          hosts={hosts}
          routers={routers}
          switches={switches}
        />
      </InnerContainer>
    </OuterContainer>
  );
};

export default Visuals;