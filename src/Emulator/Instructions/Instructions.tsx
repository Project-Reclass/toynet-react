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
import React, { FC } from 'react';
import { Heading, Text, Button, useDisclosure, Stack, Box } from '@chakra-ui/core';

import EmulatorSection from 'src/common/components/Emulator/Section';
import EmulatorInnerSection from 'src/common/components/Emulator/InnerSection';
import RestartModal from './RestartModal';

import {
  BackButton,
  LinkText,
  TaskItem,
  TaskList,
} from './styled';
import { useEmulator } from 'src/common/providers/EmulatorProvider';

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
  const { isOpen, onOpen, onClose } = useDisclosure(false);
  const { isLoading } = useEmulator();

  return (
      <EmulatorSection
        width='15vw'
        maxWidth='335px'
        minWidth='250px'
      >
        <Stack
          height='100%'
          spacing={6}
        >
          <Box pb='1rem'>
            <LinkText href='/'>
              <BackButton />
              <Text>
                Back to site
              </Text>
            </LinkText>
          </Box>
          <Stack>
            <Heading size='lg'>Module {panelData.submoduleNumber}</Heading>
            <Text>{panelData.submoduleName}</Text>
          </Stack>
          <Stack>
            <Heading size='lg'>Objective</Heading>
            <Text>{panelData.objective}</Text>
          </Stack>
          <Stack
            spacing={3}
            height='100%'
          >
            <Heading size='lg'>Tasks</Heading>
            <EmulatorInnerSection>
              <TaskList>
                {panelData.tasks.map(task => (
                  <TaskItem key={`${task}`}>{task}</TaskItem>
                ))}
              </TaskList>
            </EmulatorInnerSection>
            {!isLoading &&
              <Button
                size='sm'
                variant="solid"
                variantColor="red"
                width={100}
                fontSize='sm'
                onClick={onOpen}
              >
                  Restart
              </Button>
            }
            <RestartModal
              close={onClose}
              isOpen={isOpen}
            />
          </Stack>
        </Stack>
      </EmulatorSection>
  );
};

export default Instructions;
