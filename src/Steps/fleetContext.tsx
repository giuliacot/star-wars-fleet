import React, {
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from 'react';
import {
  People as SwapiPeople,
  Starships as SwapiStarships,
} from '../types/swapi';

export type General = {
  name?: string;
  starship: string;
};

export type StarshipsEnrich = SwapiStarships & { general?: string };

export type FleetSetup = {
  name?: string;
  description?: string;
  commander?: SwapiPeople;
  starships?: StarshipsEnrich[];
};

export type FleetValue = {
  fleet: FleetSetup;
  updateFleet: (f: Partial<FleetSetup>) => void;
  updateStarships: (s: StarshipsEnrich[]) => void;
  removeStarships: (s: StarshipsEnrich) => void;
  addGeneral: (s: StarshipsEnrich) => void;
};

const updateFleet = (f: FleetSetup) => null;
const updateStarships = (s: StarshipsEnrich[]) => null;
const removeStarships = (s: StarshipsEnrich) => null;
const addGeneral = (s: StarshipsEnrich) => null;

const FleetContext = React.createContext<FleetValue>({
  fleet: {},
  updateFleet,
  updateStarships,
  removeStarships,
  addGeneral,
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

  const updateStarships = (s: StarshipsEnrich[]) => {
    if (newFleet.starships && newFleet.starships?.length > 0) {
      setFleet({ ...newFleet, starships: [...newFleet.starships, ...s] });
    } else {
      setFleet({ ...newFleet, starships: s });
    }
  };

  const removeStarships = (s: StarshipsEnrich) => {
    setFleet({
      ...newFleet,
      starships: newFleet.starships?.filter((i) => i !== s),
    });
  };

  const addGeneral = (g: StarshipsEnrich) => {
    const updatedStartships = newFleet.starships?.map((i) => {
      return i.name === g.name ? { ...i, general: g.general } : i;
    });

    if (newFleet.starships && updatedStartships) {
      setFleet({ ...newFleet, starships: [...updatedStartships] });
    } else {
      throw new Error('Ops There is no starship');
    }
  };

  return (
    <FleetContext.Provider
      value={{
        fleet: newFleet,
        updateFleet,
        updateStarships,
        removeStarships,
        addGeneral,
      }}
    >
      {children}
    </FleetContext.Provider>
  );
};
