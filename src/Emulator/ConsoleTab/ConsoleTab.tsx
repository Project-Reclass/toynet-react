import React from 'react';

import {
  EmulatorInnerSection,
  EmulatorSection,
  EmulatorTitle,
} from 'src/common/components/Emulator';

const ConsoleTab = () => (
  <EmulatorSection>
    <EmulatorTitle size='lg' color='white'>
      Console
    </EmulatorTitle>
    <EmulatorInnerSection></EmulatorInnerSection>
  </EmulatorSection>
);

export default ConsoleTab;
