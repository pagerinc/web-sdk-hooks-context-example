import PagerClient from '@pgr/web-sdk/PagerClient';
import React, { createContext, useCallback, useContext, useState } from 'react';

const PagerClientStateContext = createContext<PagerClient | null>(null);
const PagerClientUpdaterContext = createContext<React.Dispatch<
  React.SetStateAction<PagerClient | null>
> | null>(null);

export function PagerClientProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [pagerClient, setPagerClient] = useState<PagerClient | null>(null);

  return (
    <PagerClientStateContext.Provider value={pagerClient}>
      <PagerClientUpdaterContext.Provider value={setPagerClient}>
        {children}
      </PagerClientUpdaterContext.Provider>
    </PagerClientStateContext.Provider>
  );
}

export function usePagerClientState() {
  const pagerClientState = useContext(PagerClientStateContext);
  if (typeof pagerClientState === undefined) {
    throw new Error(
      'usePagerClientState must be used within a PagerClientProvider',
    );
  }
  return pagerClientState;
}

export function usePagerClientUpdater() {
  const setPagerClient = useContext(PagerClientUpdaterContext);

  if (!setPagerClient) {
    throw new Error('usePagerClientUpdater must be used within a PagerClientProvider');
  }

  const setter = useCallback(pagerClient => setPagerClient(pagerClient), [
    setPagerClient,
  ]);
  return setter;
}
