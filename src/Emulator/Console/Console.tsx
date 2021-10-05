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
import { Box, Flex, Heading, Spinner, Text, Textarea } from '@chakra-ui/core';
import { useToynetCommand } from 'src/common/api/topology';
import {
  EmulatorInnerSection,
  EmulatorSection,
} from 'src/common/components/Emulator';

import { useEmulator } from '../EmulatorProvider';
import usePrevious from 'src/common/hooks/usePrevious';
import { useSessionStorage } from 'src/common/hooks/useSessionStorage';

const LOADING_DELAY = 500;

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
  const [runCommand, { error, isLoading }] = useToynetCommand(sessionId);
  const prevError = usePrevious(error);

  const [showLoading, setShowLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currInput, setCurrInput] = useState('>> ');
  const [history, setHistory] = useSessionStorage<ToyNetCommand[]>(
    `history-${sessionId}`, [],
    (value) => JSON.parse(value),
  );

  const loadingRef = useRef<NodeJS.Timeout | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // We should display a loading indicator if the request is taking longer
    // than our loading delay. If the request finishes before this then
    // we should not show th loading indicator.
    if (isLoading) {
      loadingRef.current = setTimeout(() => setShowLoading(isLoading), LOADING_DELAY);
      return;
    }
    clearTimeout(loadingRef.current!);
    setShowLoading(false);
    textAreaRef.current?.focus();
  }, [isLoading]);

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
      <Box height='100%' position='relative' overflow='hidden'>
        {showLoading &&
          <Spinner
            top='2'
            right='2'
            zIndex={2}
            position='absolute'
          />
        }
        <EmulatorInnerSection
          ref={scrollRef}
          padding='1rem'
        >
          <HistoryList history={history} />
          <Textarea
            ref={textAreaRef}
            isDisabled={isLoading}
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
      </Box>
    </EmulatorSection>
  );
};

export default Console;
