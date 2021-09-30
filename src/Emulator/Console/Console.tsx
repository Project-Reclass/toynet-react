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

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Flex, Heading, Text, Textarea } from '@chakra-ui/core';
import { useToynetCommand } from 'src/common/api/topology';
import {
  EmulatorInnerSection,
  EmulatorSection,
} from 'src/common/components/Emulator';

import { useEmulator } from 'src/common/providers/EmulatorProvider';
import usePrevious from 'src/common/hooks/usePrevious';
import { useSessionStorage } from 'src/common/hooks/useSessionStorage';

interface ToyNetCommand {
  command: string;
  output: string;
  color: string;
  created: string;
}

const HistoryList = memo(({ history }: {history: ToyNetCommand[]}) => (
  <>
    {history.map(cmd => (
      <AppliedCommand key={cmd.created} {...cmd} />
    ))}
  </>
));

const AppliedCommand = memo(({command, color, output}: ToyNetCommand) => (
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

const Console = () => {
  const { sessionId } = useEmulator();
  const [runCommand, { error }] = useToynetCommand(sessionId);
  const prevError = usePrevious(error);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [currInput, setCurrInput] = useState('>> ');
  const [history, setHistory] = useSessionStorage<ToyNetCommand[]>(
    `history-${sessionId}`, [],
    (value) => JSON.parse(value),
  );

  useEffect(() => {
    // We check the previous error to make sure that we don't
    // accidentally add the same error to the history twice. Or if its null.
    if (!error || error === prevError)
      return;

    const updateHistory = (command: string) => {
      setHistory(prev => [
        ...prev,
        {
          command,
          output: `${(error as any).message}`, // error is a response returned from the server
          color: 'tomato',
          created: new Date().toISOString(),
        },
      ]);
    };

    updateHistory(currInput);
    setCurrInput('>> ');
  }, [currInput, error, prevError, setHistory]);

  useEffect(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [history]);

  const handleSubmit = useCallback(async () => {
    const res = await runCommand(currInput.replace('>> ', ''));

    // res will be undefined if the request failed
    if (!res)
      return;

    setHistory(prev => [
      ...prev,
      {
        ...res,
        command: currInput,
        color: 'grey',
        created: new Date().toISOString(),
      },
    ]);
    setCurrInput('>> ');
  }, [currInput, runCommand, setHistory]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    if (value.length > 2 && !value.endsWith('\n'))
      setCurrInput(`${e.currentTarget.value}`);
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
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
  }, [currInput, handleSubmit, setHistory]);

  return (
    <EmulatorSection overflow='hidden'>
      <Flex paddingBottom='0.559rem' justifyContent='space-between'>
        <ConsoleHeading />
      </Flex>
      <EmulatorInnerSection
        ref={scrollRef}
        padding='1rem'
      >
        <HistoryList history={history} />
        <Textarea
          data-testid='console-textarea'
          _hover={{ borderColor: 'rgba(0,0,0,0)' }}
          padding='0'
          focusBorderColor='rgba(0,0,0,0)'
          borderColor='rgba(0,0,0,0)'
          backgroundColor='rgba(0,0,0,0)'
          resize='none'
          value={currInput}
          height='fit-content'
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </EmulatorInnerSection>
    </EmulatorSection>
  );
};

export default Console;
