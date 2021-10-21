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
import React, { createContext, useContext, FC, useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { useSessionStorage } from 'src/common/hooks/useSessionStorage';

import { DeviceInterface, DialogueMessage, DialogueMessageId } from 'src/common/types';
import {
  useTopology,
  TopologyState,
  TopologyActions,
  Connection,
} from 'src/Emulator/useTopology';
import { genUniqueId } from '../utils';

interface DialogueInterface {
  dialogueMessages: DialogueMessage[];
  appendDialogue: (message: string, color?: string) => DialogueMessageId;
  clearDialogue: () => any;
  updateDialogueMessage: (id: DialogueMessageId, updates: Partial<DialogueMessage>) => any;
}

const DialogueContext = createContext<DialogueInterface>({
  dialogueMessages: [],
  appendDialogue: () => '',
  clearDialogue: () => null,
  updateDialogueMessage: () => null,
});

const DialogueProvider: FC = ({ children }) => {
  const { emulatorId } = useParams<Params>();
  const [dialogueMessages, setDialogueMessages, isInitialized] =
    useSessionStorage<DialogueMessage[]>(`history-${emulatorId}`, [],
      value => JSON.parse(value));

  // We need this queue because there could be instances where a message
  // is added to the dialogue but we haven't loaded the saved messages
  // from session storage. If that happens, then our messages in session
  // storage will get erased. We can use this to to store those messages
  // added before initialization and then add it later.
  const queue = useRef<DialogueMessage[]>([]);

  useEffect(() => {
    if (isInitialized) {
      setDialogueMessages(msgs => [...msgs, ...queue.current]);
      queue.current = [];
    }
  }, [isInitialized, setDialogueMessages]);

  // Not using useCallback so we can add the same error messages repeatedly
  const appendDialogue = useCallback((message: string, color = 'White'): DialogueMessageId => {
    const id = genUniqueId();

    // if the history has not been grabbed from session storage yet, we need to
    // store that message in the queue to be added on after initialization.
    if (!isInitialized) {
      queue.current.push({ id, message, color });
      return id;
    }

    setDialogueMessages(prev => [...prev, { id, message, color }]);
    return id;
  }, [isInitialized, setDialogueMessages]);

  const clearDialogue = useCallback(() => {
    setDialogueMessages([]);
  }, [setDialogueMessages]);

  const updateDialogueMessage = useCallback((
    id: DialogueMessageId,
    updates: Partial<DialogueMessage>,
  ) => {
    const updateMessage = (messages: DialogueMessage[]) => {
      const messageToUpdate = messages.findIndex(message => message.id === id);
      if (messageToUpdate === -1)
        return messages;

      messages[messageToUpdate] = { ...messages[messageToUpdate], ...updates };
      return [...messages];
    };

    setDialogueMessages(updateMessage);
  }, [setDialogueMessages]);

  return (
    <DialogueContext.Provider
      value={{dialogueMessages, appendDialogue, clearDialogue, updateDialogueMessage}}
    >
      {children}
    </DialogueContext.Provider>
  );
};

export const useDialogue = () => useContext(DialogueContext);

const EmulatorContext = createContext<TopologyState>({
  isLoading: true,
  routers: [],
  switches: [],
  hosts: [],
  sessionId: -1,
  dispatch: () => {},
});

interface Params {
  emulatorId: string;
}

const EmulatorProvider: FC = ({ children }) => {
  const { emulatorId } = useParams<Params>();
  const topology = useTopology(Number(emulatorId));

  return (
    <EmulatorContext.Provider value={topology}>
      {children}
    </EmulatorContext.Provider>
  );
};

export const useEmulator = () => useContext(EmulatorContext);
export const useEmulatorWithDialogue = () => {
  const emulator = useEmulator();
  const messages = useDialogue();

  const dispatch: typeof emulator.dispatch = (value) => {
    switch (value.type) {
      case TopologyActions.ADD_HOST:
      case TopologyActions.ADD_ROUTER:
      case TopologyActions.ADD_SWITCH:
        const newDevice = value.payload as DeviceInterface;
        messages.appendDialogue(
          `Created device ${newDevice.name.toUpperCase()}`);
        break;
      case TopologyActions.DELETE_ROUTER:
      case TopologyActions.DELETE_HOST:
      case TopologyActions.DELETE_SWITCH:
        const deletedDevice = value.payload as DeviceInterface;
        messages.appendDialogue(
          `Deleted device ${deletedDevice.name.toUpperCase()}`);
        break;
      case TopologyActions.ADD_CONNECTION:
        const add = value.payload as Connection;
        messages.appendDialogue(
          `Attached ${add.from.toUpperCase()} to ${add.to.toUpperCase()}`);
        break;
      case TopologyActions.DELETE_CONNECTION:
        const remove = value.payload as Connection;
        if (remove.to === remove.from) {
          messages.appendDialogue(
            `Removed device ${remove.from.toUpperCase()}`);
          break;
        }
        messages.appendDialogue(
          `Removed ${remove.from.toUpperCase()} to ${remove.to.toUpperCase()}`);
        break;
    }
    emulator.dispatch(value);
  };

  return { ...emulator, ...messages, dispatch };
};

export function withEmulatorAndDialogueProvider<T>(
  Component: React.ComponentType<T>,
) {
  return (props: T) => (
    <EmulatorProvider>
      <DialogueProvider>
        <Component {...props} />
      </DialogueProvider>
    </EmulatorProvider>
  );
}

export default EmulatorProvider;