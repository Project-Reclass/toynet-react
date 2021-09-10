import React, { useRef, useEffect } from 'react';
import { Icon, Stack, Text } from '@chakra-ui/core';
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
    <div style={{zIndex: 0, overflow: 'hidden'}}>
      <EmulatorSection>
        <EmulatorTitle size='lg' color='white'>
          Actions
        </EmulatorTitle>
        <EmulatorInnerSection ref={containerScrollRef}>
          {dialogueMessages.map( (dialogueMessage) => (
            <>
              <Stack direction='row' spacing={3}>
                <Icon name='info-outline' margin='auto 0.2rem' />
                <Text>{dialogueMessage}</Text>
              </Stack>
            </>
          ))}
        </EmulatorInnerSection>
      </EmulatorSection>
    </div>
  );
};

export default DialogueBox;