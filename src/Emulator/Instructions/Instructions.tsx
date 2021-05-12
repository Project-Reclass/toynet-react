import React, { FC } from 'react';
import { Heading, Text } from '@chakra-ui/core';

import EmulatorSection from 'src/common/components/Emulator/EmulatorSection';
import EmulatorInnerSection from 'src/common/components/Emulator/InnerSection';

import {
  BackArea,
  BackButton,
  Container,
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
      <EmulatorSection
        width='15vw'
        maxWidth='335px'
        minWidth='250px'
      >
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
          <EmulatorInnerSection style={{ padding: '0.549rem' }}>
            <TaskList>
              {panelData.tasks.map(task => (
                <TaskItem key={`${task}`}>{task}</TaskItem>
              ))}
            </TaskList>
          </EmulatorInnerSection>
        </Container>
      </EmulatorSection>
  );
};

export default Instructions;
