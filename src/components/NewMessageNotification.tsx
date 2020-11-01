import gql from 'graphql-tag';
import { useSubscription } from "@apollo/react-hooks";
import React from 'react';

const SUBSCRIPTION_MESSAGE_ADDED = gql`
    subscription{
        messageAdded{
        text
        nickName
        createdAt
        roomName
    }
    }
`;

const NewMessageNotification: React.FC = () => {
    const { data, error, loading } = useSubscription(SUBSCRIPTION_MESSAGE_ADDED);
    if(loading) {
        return <div>Loading...</div>
    }
    if(error) {
        return <div>Error! {error.message}</div>
    }

    return (
        <div>
            <h1>New Message Added!</h1>
            <p>Text: {data.messageAdded.text}</p>
            <p>NickName: {data.messageAdded.nickName}</p>
            <p>createdAt: {data.messageAdded.createdAt}</p>
            <p>roomName: {data.messageAdded.roomName}</p>
        </div>
    );
};

export default NewMessageNotification;