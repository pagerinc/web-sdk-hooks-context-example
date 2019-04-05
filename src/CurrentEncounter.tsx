import { Comment, List, PageHeader } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect, useReducer, useState } from 'react';
import ReactJsonView from 'react-json-view';

import Message from '@pgr/web-sdk/Messages';
import { isImageMessage } from '@pgr/web-sdk/Messages/ImageMessage'
import { isTextMessage } from '@pgr/web-sdk/Messages/TextMessage'
import { usePagerEncounter } from './PagerEncounterContext';


interface IState {
  isLoadingHistory: boolean;
  messages: Message[];
}

type ActionType =
  | { type: 'new-message'; payload: Message }
  | { type: 'history-loaded'; payload: Message[] };

const initialState: IState = {
  isLoadingHistory: true,
  messages: [],
};

function reducer(state: IState, action: ActionType) {
  switch (action.type) {
    case 'history-loaded':
      return {
        ...state,
        isLoadingHistory: false,
        messages: action.payload
      };
    case 'new-message':
      return {
        ...state,
        messages: [...state.messages, action.payload].sort((ma, mb) => Number(ma.time) - Number(mb.time))
      };
    default:
      return state;
  }
}

export default function CurrentEncounter() {
  const { pagerEncounter } = usePagerEncounter()!;

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!pagerEncounter) {
      return;
    }

    const loadHistory = async () => {
      const history = await pagerEncounter.getMessageHistory();
      dispatch({
        payload: history.messages,
        type: 'history-loaded',
      });
    }

    pagerEncounter.onMessage((message) => {
      dispatch({
        payload: message,
        type: 'new-message',
      });
    });

    pagerEncounter.onAnswer((message) => {
      dispatch({
        payload: message,
        type: 'new-message',
      });
    });

    pagerEncounter.connect();

    loadHistory();
  }, []);

  return (
    <PageHeader title="Encounter">
      <List
        loading={state.isLoadingHistory}
        itemLayout="vertical"
        dataSource={state.messages}
        renderItem={renderItem}
      />
    </PageHeader>
  )
}

const renderItem = (message: Message) => {
  return (
    <MessageItem message={message} />
  );
}

interface IMessageItemProps {
  message: Message;
}

const MessageItem: React.SFC<IMessageItemProps> = ({message}) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const content = (
    <Fragment>
      {renderMessage(message)}
      {showMore && <ReactJsonView collapsed={true} theme="monokai" src={message} />}
    </Fragment>
  )
  return (
    <Comment
      actions={[<a onClick={ () => setShowMore(!showMore) }>{showMore ? 'hide' : 'show'} JSON</a>]}
      author={message.sender.name}
      avatar={message.sender.avatarUrl || "user.png"}
      content={content}
      datetime={moment(message.time).calendar()}
    />
  );
}

const renderMessage = (message: Message) => {
  if (isTextMessage(message)) {
    return message.text;
  }

  if (isImageMessage(message)) {
    return <img src={message.imageUrl} />;
  }

  return null;
}
