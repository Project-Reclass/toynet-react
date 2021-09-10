/* eslint-disable no-magic-numbers */
import React, { createContext, useContext, FC, useState, useCallback } from 'react';

import { DeviceInterface } from 'src/common/types';
import { useTopology, TopologyState, TopologyActions, Connection } from 'src/Emulator/useTopology';

interface DialogueInterface {
  dialogueMessages: string[];
  appendDialogue: (message: string) => any;
  clearDialogue: () => any;
}

const DialogueContext = createContext<DialogueInterface>({
  dialogueMessages: [],
  appendDialogue: () => null,
  clearDialogue: () => null,
});

const DialogueProvider: FC = ({ children }) => {
  const [dialogueMessages, setDialogueMessages] = useState<string[]>('test,'.repeat(50).split(','));

  // Not using useCallback so we can add the same error messages repeatedly
  const appendDialogue = (message: string) => {
    setDialogueMessages(dialogueMessages.concat([message]));
  };

  const clearDialogue = useCallback(() => {
    setDialogueMessages([]);
  }, []);

  return (
    <DialogueContext.Provider
      value={{dialogueMessages, appendDialogue, clearDialogue}}
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

const EmulatorProvider: FC = ({ children }) => {
  const topology = useTopology(1);

  return (
    <EmulatorContext.Provider value={topology}>
      {children}
    </EmulatorContext.Provider>
  );
};

export const useEmulatorBasic = () => useContext(EmulatorContext);
export const useEmulator = () => {
  const emulator = useEmulatorBasic();
  const messages = useDialogue();

  const dispatch: typeof emulator.dispatch = (value) => {
    switch (value.type) {
      case TopologyActions.ADD_HOST:
      case TopologyActions.ADD_ROUTER:
      case TopologyActions.ADD_SWITCH:
        messages.appendDialogue(`Added ${(value.payload as DeviceInterface).name}`);
        break;
      case TopologyActions.DELETE_ROUTER:
      case TopologyActions.DELETE_HOST:
      case TopologyActions.DELETE_SWITCH:
        messages.appendDialogue(`Deleted ${(value.payload as DeviceInterface).name}`);
        break;
      case TopologyActions.ADD_CONNECTION:
        const add = value.payload as Connection;
        messages.appendDialogue(`Attached ${add.from} to ${add.to}`);
        break;
      case TopologyActions.DELETE_CONNECTION:
        const remove = value.payload as Connection;
        messages.appendDialogue(`Removed ${remove.from} to ${remove.to}`);
        break;
    }
    emulator.dispatch(value);
  };

  return { ...emulator, dispatch };
};

export function withEmulatorAndDialogueProvider<T>(Component: React.ComponentType<T>) {
  return (props: T) => (
    <EmulatorProvider>
      <DialogueProvider>
        <Component {...props} />
      </DialogueProvider>
    </EmulatorProvider>
  );
}

export default EmulatorProvider;