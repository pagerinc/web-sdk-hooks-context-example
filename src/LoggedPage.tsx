import { Layout } from 'antd';
import React, { useState } from 'react';

import CurrentEncounter from './CurrentEncounter';
import EncounterHistory from './EncounterHistory';
import Header from './Header';
import Home from './Home';
import { SectionType } from './types';

const { Content } = Layout;

export default function LoggedPage() {
  const [section, setSection] = useState<SectionType>('home');

  const renderSection = () => {
    switch(section) {
      case 'encounter-history':
        return <EncounterHistory />;
      case 'current-encounter':
        return <CurrentEncounter />;
      default:
        return <Home />;
    }
  }
  return (
    <Layout>
      <Header setSection={setSection} />
      <Content style={{ padding: '0 50px' }}>
        {renderSection()}
      </Content>
    </Layout>
  );
}
