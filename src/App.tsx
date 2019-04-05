import PagerSDK from '@pgr/web-sdk';
import PagerClient from '@pgr/web-sdk/PagerClient';
import "antd/dist/antd.css";
import React, {useEffect} from 'react';

import LoggedPage from './LoggedPage';
import LoginForm from './LoginForm';

import { PagerClientProvider, usePagerClient } from './PagerClientContext';
import { PagerEncounterProvider } from './PagerEncounterContext';


function PagerApp() {

  const { pagerClient, setPagerClient } = usePagerClient()!;


  useEffect(()=> {
    const serializedClient = localStorage.getItem('pager-client');
    if (serializedClient) {
      const newPagerClient: PagerClient = PagerSDK.clientFromSerialized(serializedClient);
      setPagerClient(newPagerClient);
    }
  }, []);

  const handleLogin = async (apiKey: string, email: string, password: string) => {
    const pagerSDK: PagerSDK = await PagerSDK.init({apiKey});
    const token: string = await pagerSDK._loginPager(email, password);

    const newPagerClient: PagerClient = await pagerSDK.clientFromToken(token);
    localStorage.setItem('pager-client', newPagerClient.serialize());
    setPagerClient(newPagerClient);
  }

  if (pagerClient) {
    return (
      <LoggedPage></LoggedPage>
    );
  } else {
    return (
      <LoginForm handleLogin={handleLogin}/>
    );
  }
}

function App() {
  return (
    <PagerClientProvider>
      <PagerEncounterProvider>
        <PagerApp/>
      </PagerEncounterProvider>
    </PagerClientProvider>
  );
}

export default App;
