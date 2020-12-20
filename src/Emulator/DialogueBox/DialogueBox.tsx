import React, { useRef, useEffect } from 'react';
import { Icon } from '@chakra-ui/core';
import { useDialogue } from '../EmulatorProvider';

import { DialogueBoxContainer, InnerContainer, StyledClearbutton } from './styled';

const DialogueBox = () => {
  const { dialogueMessages, clearDialogue } = useDialogue();

  useEffect(() => {
    if (containerScrollRef.current){
      const element = containerScrollRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [dialogueMessages]);

  const containerScrollRef = useRef< HTMLDivElement>(null);

  return (
    <div style={{marginTop: '2vh', zIndex: 0}}>
      <DialogueBoxContainer>
        <InnerContainer ref={containerScrollRef}>
          {dialogueMessages.map( (dialogueMessage) => (
            <>
              <Icon name='info-outline' margin='auto 0.2rem' />
              <span style={{ fontWeight: 'bold' }}>Error:</span> {dialogueMessage}
              <br/>
            </>
          ))}
        </InnerContainer>
        <StyledClearbutton onClick={clearDialogue}>Clear</StyledClearbutton>
      </DialogueBoxContainer>
    </div>
  );
};

export default DialogueBox;