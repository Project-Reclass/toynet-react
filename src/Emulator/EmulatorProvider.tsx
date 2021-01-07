import React, { createContext, useContext, FC, useState, useCallback } from 'react';
import { useTopology, TopologyState } from 'src/Emulator/useTopology';

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
  const [dialogueMessages, setDialogueMessages] = useState<string[]>([]);

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

export const useEmulator = () => useContext(EmulatorContext);

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