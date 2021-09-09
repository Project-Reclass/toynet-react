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
import React, { useRef, useEffect } from 'react';
import { Icon } from '@chakra-ui/core';
import { useDialogue } from '../EmulatorProvider';
import EmulatorSection from 'src/common/components/Emulator/Section';

import EmulatorInnerSection from 'src/common/components/Emulator/InnerSection';
import { EmulatorTitle } from 'src/common/components/Emulator';

const DialogueBox = () => {
  const { dialogueMessages } = useDialogue();

  useEffect(() => {
    if (containerScrollRef.current){
      const element = containerScrollRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [dialogueMessages]);

  const containerScrollRef = useRef< HTMLDivElement>(null);

  return (
    <div style={{zIndex: 0}}>
      <EmulatorSection>
        <EmulatorTitle size='lg' color='white'>
          Actions
        </EmulatorTitle>
        <EmulatorInnerSection ref={containerScrollRef}>
          {dialogueMessages.map( (dialogueMessage) => (
            <>
              <Icon name='info-outline' margin='auto 0.2rem' />
              <span style={{ fontWeight: 'bold' }}>Error:</span> {dialogueMessage}
              <br/>
            </>
          ))}
        </EmulatorInnerSection>
      </EmulatorSection>
    </div>
  );
};

export default DialogueBox;