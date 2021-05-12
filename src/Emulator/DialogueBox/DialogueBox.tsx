import React, { useRef, useEffect } from 'react';
import { Heading, Icon } from '@chakra-ui/core';
import { useDialogue } from '../EmulatorProvider';

import { DialogueBoxContainer, InnerContainer } from './styled';

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
      <DialogueBoxContainer>
        <Heading size='lg' color='white' paddingBottom={'0.559rem'}>
          Actions
        </Heading>
        <InnerContainer ref={containerScrollRef}>
          {dialogueMessages.map( (dialogueMessage) => (
            <>
              <Icon name='info-outline' margin='auto 0.2rem' />
              <span style={{ fontWeight: 'bold' }}>Error:</span> {dialogueMessage}
              <br/>
            </>
          ))}
        </InnerContainer>
      </DialogueBoxContainer>
    </div>
  );
};

export default DialogueBox;