import PagerClient from '@pgr/web-sdk/PagerClient';
import React, { createContext, useContext, useState } from 'react';

interface IPagerClientContext {
  pagerClient: PagerClient | null;
  setPagerClient: React.Dispatch<React.SetStateAction<PagerClient | null>>;
}

const PagerClientContext = createContext<IPagerClientContext | null>(null);

export function PagerClientProvider({children}: {children: React.ReactChildren}) {
  const [pagerClient, setPagerClient] = useState<PagerClient | null>(null);
  const value: IPagerClientContext = { pagerClient, setPagerClient };

  return (
    <PagerClientContext.Provider value={value}>{children}</PagerClientContext.Provider>
  );
}

export const PagerClientConsumer = PagerClientContext.Consumer;

export const usePagerClient = () => useContext<IPagerClientContext | null>(PagerClientContext);
