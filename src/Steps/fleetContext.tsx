import React, {
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { People } from '../hooks/usePeople';

export type FleetSetup = {
  name?: string;
  description?: string;
  commander?: People;
};

export type FleetValue = {
  fleet: FleetSetup;
  updateFleet: (c: Partial<FleetSetup>) => void;
};

export const updateFleet = (f: FleetSetup) => {};

const FleetContext = React.createContext<FleetValue>({
  fleet: {},
  updateFleet,
});

export const useFleetContext = () => {
  return useContext(FleetContext);
};

export const FleetData: FunctionComponent<
  React.HTMLAttributes<HTMLButtonElement> & ReactNode
> = ({ children }) => {
  const [newFleet, setFleet] = useState<FleetSetup>({});
  const updateFleet = (f: FleetSetup) => {
    setFleet({ ...newFleet, ...f });
  };

  return (
    <FleetContext.Provider value={{ fleet: newFleet, updateFleet }}>
      {children}
    </FleetContext.Provider>
  );
};
