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
import { FC } from 'react';
import { useParams } from 'react-router';
import {
  Heading,
  Text,
  Stack,
  Box,
  Divider,
} from '@chakra-ui/react';

import EmulatorSection from 'src/common/components/Emulator/Section';
import EmulatorInnerSection from 'src/common/components/Emulator/InnerSection';
import NavigationButtons from 'src/common/components/NavigationButtons';

import {
  BackButton,
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

interface Params {
  moduleId: string;
  emulatorId: string;
}

const Instructions: FC<Props> = ({ panelData }) => {
  const { moduleId, emulatorId } = useParams<Params>();

  return (
      <EmulatorSection
        width='15vw'
        maxWidth='335px'
        minWidth='250px'
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
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
            <Box pb='1'>
              <Divider />
              <NavigationButtons
                size='sm'
                variant='ghost'
                nextText='Next'
                prevText='Previous'
                colorScheme='whiteAlpha'
                _hover={{ color: 'white' }}
                moduleId={Number(moduleId)}
                submoduleId={Number(emulatorId)}
                submoduleType='LAB'
                btnRightProps={{ pr: 0 }}
                btnLeftProps={{ pl: 0 }}
              />
            </Box>
          </Stack>
        </Stack>
      </EmulatorSection>
  );
};

export default Instructions;
