import gql from 'graphql-tag';
import { useSubscription } from "@apollo/react-hooks";
import React, { useMemo } from 'react';

interface Message {
    text: string;
    createdAt: Date;
    nickName: string;
}

type Props = {
    messages: [Message];
}

const Messages = ({ messages }: Props) => {
    console.log(messages)
    return(
      <div>
          <h1>{messages[0].text}</h1>
          <h1>{messages[0].createdAt}</h1>
          <h1>{messages[0].nickName}</h1>
      </div>
    )
};

export default Messages;