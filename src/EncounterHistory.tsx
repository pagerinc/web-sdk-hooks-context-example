import { Avatar, List, PageHeader } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import ReactJsonView from 'react-json-view';

import { EncounterHistoryResponseData } from '@pgr/web-sdk/Types';
import { useLoad } from './hooks';
import { usePagerClientState } from './PagerClientContext';

const ListItem = List.Item;
const ListItemMeta = ListItem.Meta;

export default function Home() {
  const pagerClient = usePagerClientState();

  const [encounters, isLoading] = useLoad(async () => {
    if (!pagerClient) {
      return null;
    }
    return pagerClient.getEncounterHistory();
  });

  return (
    <PageHeader title="Encounter History">
      <List
        loading={isLoading}
        itemLayout="vertical"
        dataSource={encounters || []}
        renderItem={renderItem}
      />
    </PageHeader>
  );
}

const renderItem = (encounter: EncounterHistoryResponseData) => {
  return <EncounterItem encounter={encounter} />;
};

interface IEncounterItemProps {
  encounter: EncounterHistoryResponseData;
}

const EncounterItem: React.SFC<IEncounterItemProps> = ({ encounter }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <ListItem
      actions={[
        <a onClick={() => setShowMore(!showMore)}>
          {showMore ? 'less' : 'more'}
        </a>,
      ]}
    >
      <ListItemMeta
        avatar={<Avatar src={encounter.firstParticipant.avatar} />}
        title={encounter.firstParticipant.displayName}
        description={moment(encounter.createdAt).calendar()}
      />
      {showMore && (
        <ReactJsonView collapsed={true} theme="monokai" src={encounter} />
      )}
    </ListItem>
  );
};
