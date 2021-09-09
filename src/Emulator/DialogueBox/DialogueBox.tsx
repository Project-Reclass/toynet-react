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
              <span style={{ fontWeight: 'bold' }}></span> {dialogueMessage}
              <br/>
            </>
          ))}
        </EmulatorInnerSection>
      </EmulatorSection>
    </div>
  );
};

export default DialogueBox;