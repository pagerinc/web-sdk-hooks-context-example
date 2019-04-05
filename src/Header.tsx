import { Layout, Menu, Skeleton } from 'antd';
import React from 'react';

import { usePagerClient } from './PagerClientContext';
import { usePagerEncounter } from './PagerEncounterContext';

import PagerEncounter from '@pgr/web-sdk/PagerEncounter';
import { ClickParam } from 'antd/lib/menu';
import { useLoad } from './hooks';
import { SectionType } from './types';

const LayoutHeader = Layout.Header;

interface IHeaderProps {
  setSection: (section: SectionType) => any;
}

const Header: React.SFC<IHeaderProps> = ({ setSection }) => {
  const { pagerClient } = usePagerClient()!;
  const { pagerEncounter, setPagerEncounter } = usePagerEncounter()!;

  if (!pagerClient) {
    return null;
  }

  const [currentEncounter, isLoadingEncounter] = useLoad(async () => {
    const newEncounter = await pagerClient.getCurrentEncounter();
    if (newEncounter) {
      setPagerEncounter(newEncounter);
    }
    return newEncounter;
  });

  const menuClick = ({key}: ClickParam) => {
    const section = key as SectionType;

    if (section === 'logout') {
      return pagerClient.logout();
    }
    if (section === 'current-encounter' && !pagerEncounter) {
      return;
    }
    return setSection(section);
  }

  return (
    <LayoutHeader>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
        onClick={menuClick}
      >
        <Menu.Item key="home">Hello, {pagerClient.profile.firstName}</Menu.Item>
        <Menu.Item key="2" disabled>Appointments History</Menu.Item>
        <Menu.Item key="encounter-history">Encounter History</Menu.Item>
        <Menu.Item key="4" disabled>Insurance</Menu.Item>
        <Menu.Item key="5" disabled>Terms of Service</Menu.Item>
        <Menu.Item key="6" disabled>Payments</Menu.Item>
        <Menu.Item key="7" disabled>Promotions</Menu.Item>
        <Menu.Item key="current-encounter" disabled={isLoadingEncounter}>
          <Skeleton active paragraph={false} loading={isLoadingEncounter}>
            {currentEncounter ? 'Current Encounter' : 'Create Encounter'}
          </Skeleton>
        </Menu.Item>
        <Menu.Item key="logout">Logout</Menu.Item>
      </Menu>
    </LayoutHeader>
  )
}

export default Header;
