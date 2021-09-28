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

import React, { memo, useEffect, useRef, useState } from 'react';
import { Box, Flex, Heading, Text, Textarea } from '@chakra-ui/core';
import { useToynetCommand } from 'src/common/api/topology';
import { ToynetCommandResponse } from 'src/common/api/topology/types';
import {
  EmulatorInnerSection,
  EmulatorSection,
} from 'src/common/components/Emulator';

import { useEmulator } from '../EmulatorProvider';

interface ToynetCommand {
  command: string;
  output: string;
  color: string;
  created: string;
}

const AppliedCommand = memo(({command, color, output}: ToynetCommand) => (
  <Box>
    <Text>{`${command}`}</Text>
    <Text color={color}>{output}</Text>
  </Box>
));

const ConsoleHeading = memo(() => (
  <Heading size='lg'>
    Console
  </Heading>
));

const ConsoleTab = () => {
  const { sessionId, isLoading } = useEmulator();
  const [runCommand, { isError, isIdle, error }] = useToynetCommand(sessionId);
  const errorRef = useRef(error);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [currInput, setCurrInput] = useState('>> ');
  const [history, setHistory] = useState<ToynetCommand[]>([]);

  useEffect(() => {
    if (!error || error === errorRef.current)
      return;

    errorRef.current = error;
    console.log('cool cool cool');
    const updateHistory = (command: string) => {
      console.log('updateing history');
      setHistory(prev => [
        ...prev,
        {
          command,
          output: 'Error',
          color: 'tomato',
          created: `${new Date().toISOString()}${Math.random()}effect`,
        },
      ]);
    };

    setCurrInput(curr => {
      if (curr !== '>> ')
        updateHistory(curr);
      return '>> ';
    });

  }, [error]);

  useEffect(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [history]);

  const handleSubmit = async () => {
    const res = await runCommand(currInput.replace('>> ', ''));
    if (!res)
      return;

    console.log('submit', {history});
    setHistory(prev => [
      ...prev,
      {
        ...res,
        command: currInput,
        color: 'grey',
        created: `${new Date().toISOString()}${Math.random()}error`,
      },
    ]);
    setCurrInput('>> ');
  };

  return (
    <EmulatorSection overflow='hidden'>
      <Flex paddingBottom='0.559rem' justifyContent='space-between'>
        <ConsoleHeading />
      </Flex>
      <EmulatorInnerSection
        ref={scrollRef}
        padding='1rem'
      >
        {console.log({ history })}
        {history.map(cmd => (
          <AppliedCommand key={cmd.created} {...cmd} />
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
    </EmulatorSection>
  );
};

export default ConsoleTab;
