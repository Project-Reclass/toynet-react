import React, { FC } from 'react';
import { Heading, Text } from '@chakra-ui/core';

import {
  BackArea,
  BackButton,
  Container,
  InstructionsContainer,
  LinkText,
  TaskItem,
  TaskList,
} from './styled';

export interface PanelData {
  submoduleNumber: number;
  submoduleName: string;
  objective: string;
  tasks: string[];
}

interface Props {
  panelData: PanelData;
}

const Instructions: FC<Props> = ({ panelData }) => {
  return (
    <div style={{ marginLeft: '3.5rem', marginTop: '2vh', zIndex: 0 }}>
      <InstructionsContainer>
        <BackArea>
            <LinkText href='/'>
              <BackButton />
              <Text>
                Back to site
              </Text>
            </LinkText>
        </BackArea>
        <Container>
          <Heading size='lg'>Module {panelData.submoduleNumber}</Heading>
          <Text>{panelData.submoduleName}</Text>
        </Container>
        <Container>
          <Heading size='lg'>Objective</Heading>
          <Text>{panelData.objective}</Text>
        </Container>
        <Container>
          <Heading size='lg'>Tasks</Heading>
          <TaskList>
            {panelData.tasks.map(task => (
              <TaskItem key={`${task}`}>{task}</TaskItem>
            ))}
          </TaskList>
        </Container>
      </InstructionsContainer>
    </div>
  );
};

export default Instructions;
