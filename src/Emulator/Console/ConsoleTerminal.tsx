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
import { EmulatorInnerSection } from 'src/common/components/Emulator';
import { SessionId, ToynetCommandResponse } from 'src/common/api/topology/types';
import { useSessionStorage } from 'src/common/hooks/useSessionStorage';

import { ToyNetCommand } from './types';
import ConsoleTextarea from './ConsoleTextarea';
import HistoryList from './ConsoleHistoryList';

interface Props {
  isLoading: boolean;
  sessionId: SessionId,
  selectedDevice: string;
  runCommand: (command: string) => Promise<ToynetCommandResponse | undefined>;
}

export default function ConsoleTerminal({
  isLoading,
  sessionId,
  selectedDevice,
  runCommand,
}: Props) {
  const [history, setHistory] = useSessionStorage<ToyNetCommand[]>(
    `history-${sessionId}`, [],
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
      setHistory(prev => [
        ...prev,
        {
          command: input,
          color: 'tomato',
          output: `No device selected. Please select a device from
                   the dropdown to run a command.`,
          created: new Date().toISOString(),
        },
      ]);
      return false;
    }

    try {
      const res = await runCommand(
        `${selectedDevice} ${input.replace('>> ', '')}`,
      );

      if (!res) {
        setHistory(prev => [
          ...prev,
          {
            command: input,
            output: 'Internal server error',
            color: 'tomato',
            created: new Date().toISOString(),
          },
        ]);
        return false;
      }

      setHistory(prev => [
        ...prev,
        {
          ...res,
          command: input,
          color: 'grey',
          created: new Date().toISOString(),
        },
      ]);
      return true;
    } catch (error) {
      setHistory(prev => [
        ...prev,
        {
          command: input,
          output: `${(error as any).message}`, // error is a response returned from the server
          color: 'tomato',
          created: new Date().toISOString(),
        },
      ]);
      return false;
    }

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