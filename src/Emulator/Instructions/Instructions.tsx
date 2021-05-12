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
import { InnerContainer } from '../DialogueBox/styled';

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
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Heading size='lg'>Tasks</Heading>
          <InnerContainer style={{ padding: '0.549rem' }}>
            <TaskList>
              {panelData.tasks.map(task => (
                <TaskItem key={`${task}`}>{task}</TaskItem>
              ))}
            </TaskList>
          </InnerContainer>
        </Container>
      </InstructionsContainer>
  );
};

export default Instructions;
