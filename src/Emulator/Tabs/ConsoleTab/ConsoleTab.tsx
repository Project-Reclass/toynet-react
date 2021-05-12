import React from 'react';
import { Heading } from '@chakra-ui/core';

import EmulatorSection from 'src/common/components/Emulator/EmulatorSection';
import EmulatorInnerSection from 'src/common/components/Emulator/InnerSection';

const ConsoleTab = () => (
  <EmulatorSection>
    <Heading size='lg' color='white'>
      Console
    </Heading>
    <EmulatorInnerSection></EmulatorInnerSection>
  </EmulatorSection>
);

export default ConsoleTab;
