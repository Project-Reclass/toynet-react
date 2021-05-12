import React, { useRef, useEffect } from 'react';
import { Heading, Icon } from '@chakra-ui/core';
import { useDialogue } from '../EmulatorProvider';
import EmulatorSection from 'src/common/components/Emulator/EmulatorSection';

import EmulatorInnerSection from 'src/common/components/Emulator/InnerSection';

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
        <Heading size='lg' color='white' paddingBottom={'0.559rem'}>
          Actions
        </Heading>
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