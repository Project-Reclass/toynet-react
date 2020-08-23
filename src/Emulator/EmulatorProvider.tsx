import React, { createContext, useContext, FC } from 'react';
import { useTopology, TopologyState } from 'src/Emulator/useTopology';

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
export function withEmulatorProvider<T>(Component: React.ComponentType<T>) {
  return (props: T) => (
    <EmulatorProvider>
      <Component {...props} />
    </EmulatorProvider>
  );
}

export default EmulatorProvider;