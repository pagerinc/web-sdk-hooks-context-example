import { Avatar, List, PageHeader  } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import ReactJsonView from 'react-json-view';

import { EncounterHistoryResponseData } from '@pgr/web-sdk/types';
import { useLoad } from './hooks';
import { usePagerClient } from './PagerClientContext';

const ListItem = List.Item;
const ListItemMeta = ListItem.Meta;

export default function Home() {
  const { pagerClient } = usePagerClient()!;

  if (!pagerClient) {
    return <p>Error</p>;
  }

  const [encounters, isLoading] = useLoad(() => pagerClient.getEncounterHistory());

  return (
    <PageHeader title="Encounter History">
      <List
        loading={isLoading}
        itemLayout="vertical"
        dataSource={encounters || []}
        renderItem={renderItem}
      />
    </PageHeader>
  )
}

const renderItem = (encounter: EncounterHistoryResponseData) => {
  return (
    <EncounterItem encounter={encounter} />
  );
}

interface IEncounterItemProps {
  encounter: EncounterHistoryResponseData;
}

const EncounterItem: React.SFC<IEncounterItemProps> = ({encounter}) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <ListItem actions={[<a onClick={()=>setShowMore(!showMore)}>{showMore ? 'less' : 'more'}</a>]}>
      <ListItemMeta
        avatar={<Avatar src={encounter.firstParticipant.avatar} />}
        title={encounter.firstParticipant.displayName}
        description={moment(encounter.createdAt).calendar()}
      />
      {showMore && <ReactJsonView collapsed={true} theme="monokai" src={encounter} />}
    </ListItem>
  );
}
