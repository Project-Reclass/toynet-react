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

import React, { useCallback, useEffect, useRef } from 'react';
import * as FS from '@fullstory/browser';
import { EmulatorInnerSection } from 'src/common/components/Emulator';
import { SessionId, ToynetCommandResponse } from 'src/common/api/topology/types';
import { useSessionStorage } from 'src/common/hooks/useSessionStorage';

import { ToyNetCommand } from './types';
import ConsoleTextarea from './ConsoleTextarea';
import HistoryList from './ConsoleHistoryList';


const getCommandFromResponse = async (
  device: string,
  command: string,
  runCommand: (command: string) =>
    Promise<ToynetCommandResponse | undefined>,
  prefix: string = '>> ',
): Promise<ToyNetCommand> => {
  const partialResponse: Pick<ToyNetCommand, 'command' | 'created'> = {
    command,
    created: new Date().toISOString(),
  };

  try {
    const res = await runCommand(
      `${device} ${command.replace(prefix, '')}`);
    if (!res) {
      return  {
        ...partialResponse,
        color: 'red',
        output: ['Internal server error'],
        status: 'error',
      };
    }
    const formattedRes = res.output.split('\r\n');
    return {
      ...partialResponse,
      output: formattedRes,
      status: 'success',
      color: 'grey',
    };
  } catch (error) {
    return {
      ...partialResponse,
      output: [`${(error as any).message}`], // error is a response returned from the server
      color: 'tomato',
      status: 'error',
    };
  }
};

interface Props {
  isLoading: boolean;
  sessionId: SessionId,
  selectedDevice: string;
  runCommand: (command: string) =>
    Promise<ToynetCommandResponse | undefined>;
}

export default function ConsoleTerminal({
  isLoading,
  sessionId,
  selectedDevice,
  runCommand,
}: Props) {
  const [history, setHistory] = useSessionStorage<ToyNetCommand[]>(
    `console-history-${sessionId}-${selectedDevice}`, [],
    (value) => JSON.parse(value),
  );

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) {
      textAreaRef.current?.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [history]);

  const handleSubmit = useCallback(async (input: string): Promise<boolean> => {
    if (selectedDevice === '') {
      // This is an example script - don't forget to change it!
      FS.event('No device selected', {
        input: input || 'No input provided',
      });

      setHistory(prev => [
        ...prev,
        {
          command: input,
          color: 'tomato',
          output: [`No device selected. Please select a device from
                   the dropdown to run a command.`],
          created: new Date().toISOString(),
          status: 'error',
        },
      ]);
      return false;
    }

    const toynetCommand = await getCommandFromResponse(
      selectedDevice, input, runCommand);
    setHistory(prev => [
      ...prev,
      toynetCommand,
    ]);

    return toynetCommand.status === 'success';
  }, [runCommand, selectedDevice, setHistory]);

  return (
    <EmulatorInnerSection
      ref={scrollRef}
      padding='1rem'
    >
      <HistoryList history={history} />
      <ConsoleTextarea
        ref={textAreaRef}
        onClear={() => setHistory([])}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </EmulatorInnerSection>
  );
}