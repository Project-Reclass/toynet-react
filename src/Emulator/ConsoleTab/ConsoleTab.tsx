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
import { Box, Flex, Heading, Skeleton, Text, Textarea } from '@chakra-ui/core';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useToynetCommand } from 'src/common/api/topology';
import { ToynetCommandResponse } from 'src/common/api/topology/types';

import {
  EmulatorInnerSection,
  EmulatorSection,
} from 'src/common/components/Emulator';
import { useEmulator } from '../EmulatorProvider';
import DeviceSelector from './DeviceSelector';

interface ToynetCommand {
  command: string;
  output: string;
  color: string;
}

const AppliedCommand = ({command, color, output}: ToynetCommand) => (
  <Box>
    <Text>{`${command}`}</Text>
    <Text color={color}>{output}</Text>
  </Box>
);

const CoolHeading = memo(() => (
  <Heading size='lg'>
    Console
  </Heading>
));

const ConsoleTab = () => {
  const { switches, hosts, routers, sessionId, isLoading } = useEmulator();
  const [runCommand, { isError, isIdle }] = useToynetCommand(sessionId);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [currInput, setCurrInput] = useState('>> ');
  const [history, setHistory] = useState<ToynetCommand[]>([]);

  useEffect(() => {
    if (!isIdle && isError) {
      setCurrInput(curr => {
        // eslint-disable-next-line max-nested-callbacks
        setHistory(prev => [
          ...prev,
          {
            command: curr,
            output: 'Error',
            color: 'tomato',
          },
        ]);
        return '>> ';
      });
    }
  }, [isError, isIdle, isLoading]);

  useEffect(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [history]);

  const options = useMemo(() =>
    [
      ...routers.map(el => el.name),
      ...switches.map(el => el.name),
      ...hosts.map(el => el.name),
    ],
  [hosts, routers, switches]);

  const handleSubmit = async () => {
    const res = await runCommand(currInput.replace('>> ', ''));
    if (!res)
      return;

    setHistory(prev => [
      ...prev,
      {
        ...res as ToynetCommandResponse,
        command: currInput,
        color: 'green.200',
      },
    ]);
    setCurrInput('>> ');
  };

  return (
    <EmulatorSection
      overflow='hidden'
    >
      <Flex paddingBottom='0.559rem' justifyContent='space-between'>
        <CoolHeading />
        <DeviceSelector options={options} />
      </Flex>
      <Skeleton isLoaded={!isLoading} width='100%' height='100%'  colorStart='#22252c'
            colorEnd='#454950'>
        <EmulatorInnerSection
          ref={scrollRef}
          padding='1rem'
        >
          {history.map(cmd => (
            <AppliedCommand {...cmd} />
          ))}
          <Textarea
            _hover={{ borderColor: 'rgba(0,0,0,0)' }}
            padding='0'
            focusBorderColor='rgba(0,0,0,0)'
            borderColor='rgba(0,0,0,0)'
            backgroundColor='rgba(0,0,0,0)'
            resize='none'
            value={currInput}
            height='fit-content'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                const { value } = e.currentTarget;
                if (value.length > 2 && !value.endsWith('\n'))
                  setCurrInput(`${e.currentTarget.value}`);
              }
            }
            onKeyPress={(e: React.KeyboardEvent) => {
              if (e.shiftKey && e.key === 'Enter') {
                setCurrInput(curr => `${curr}\n`);
                return;
              }
              if (e.key === 'Enter') {
                if (currInput.replace('>> ', '') === 'clear') {
                  setCurrInput('>> ');
                  setHistory([]);
                  return;
                }

                handleSubmit();
              }
            }}
          />
        </EmulatorInnerSection>
      </Skeleton>
    </EmulatorSection>
  );
};

export default ConsoleTab;
