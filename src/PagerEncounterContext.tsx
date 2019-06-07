import PagerEncounter from '@pgr/web-sdk/PagerEncounter';
import React, { createContext, useCallback, useContext, useState } from 'react';

const PagerEncounterStateContext = createContext<PagerEncounter | null>(null);
const PagerEncounterUpdaterContext = createContext<React.Dispatch<
  React.SetStateAction<PagerEncounter | null>
> | null>(null);

export function PagerEncounterProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [pagerEncounter, setPagerEncounter] = useState<PagerEncounter | null>(null);

  return (
    <PagerEncounterStateContext.Provider value={pagerEncounter}>
      <PagerEncounterUpdaterContext.Provider value={setPagerEncounter}>
        {children}
      </PagerEncounterUpdaterContext.Provider>
    </PagerEncounterStateContext.Provider>
  );
}

export function usePagerEncounterState() {
  const pagerEncounterState = useContext(PagerEncounterStateContext);
  if (typeof pagerEncounterState === undefined) {
    throw new Error(
      'usePagerEncounterState must be used within a PagerEncounterProvider',
    );
  }
  return pagerEncounterState;
}

export function usePagerEncounterUpdater() {
  const setPagerEncounter = useContext(PagerEncounterUpdaterContext);

  if (!setPagerEncounter) {
    throw new Error('usePagerEncounterUpdater must be used within a PagerEncounterProvider');
  }

  const setter = useCallback(pagerEncounter => setPagerEncounter(pagerEncounter), [
    setPagerEncounter,
  ]);
  return setter;
}
