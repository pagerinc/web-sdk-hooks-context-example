import PagerEncounter from '@pgr/web-sdk/PagerEncounter';
import React, { createContext, useContext, useState } from 'react';

interface IPagerEncounterContext {
  pagerEncounter: PagerEncounter | null;
  setPagerEncounter: React.Dispatch<React.SetStateAction<PagerEncounter | null>>;
}

const PagerEncounterContext = createContext<IPagerEncounterContext | null>(null);

export function PagerEncounterProvider({children}: {children: React.ReactChildren}) {
  const [pagerEncounter, setPagerEncounter] = useState<PagerEncounter | null>(null);
  const value: IPagerEncounterContext = { pagerEncounter, setPagerEncounter };

  return (
    <PagerEncounterContext.Provider value={value}>{children}</PagerEncounterContext.Provider>
  );
}

export const PagerEncounterConsumer = PagerEncounterContext.Consumer;

export const usePagerEncounter = () => useContext<IPagerEncounterContext | null>(PagerEncounterContext);
