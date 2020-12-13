import React, { useRef, useEffect } from 'react';
import { Icon } from '@chakra-ui/core';
import { useDialogue } from '../EmulatorProvider';

import { DialogueBoxContainer, InnerContainer, StyledClearbutton } from './styled';

const DialogueBox = () => {
  const { dialogueMessages, clearDialogue } = useDialogue();

  useEffect(() => {
    if (containerScrollRef.current){
      // Convert to HTMLDivElement, because TypeScript complains that
      // .scrollTop and .scrollHeight does not exist.
      // Convert to unknown first, because TypeScript complains that
      // 'null' and 'HTMLDivElement' do not sufficiently overlap.
      const element = containerScrollRef.current as unknown as HTMLDivElement;
      element.scrollTop = element.scrollHeight;
    }
  }, [dialogueMessages]);

  const containerScrollRef = useRef(null);

  return (
    <div style={{ marginLeft: '3.5rem', marginTop: '2vh', zIndex: 0, marginRight: '3.5rem'  }}>
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