import gql from 'graphql-tag';
import { useSubscription } from "@apollo/react-hooks";
import React from 'react';

const SUBSCRIPTION_USER_JOINED = gql`
    subscription{
        userJoinedRoom{
            nickName
            roomName
    }
    }
`;

const SUBSCRIPTION_USER_LEAVE = gql`
    subscription{
        userLeaveRoom{
            nickName
            roomName
    }
    }
`;

const NewUserNotification: React.FC = () => {
    const { data, error, loading } = useSubscription(SUBSCRIPTION_USER_JOINED);
    if(loading) {
        return <div>Loading...</div>
    }
    if(error) {
        return <div>Error! {error.message}</div>
    }

    return (
        <div>
            <h1>Usuário {data.userJoinedRoom.nickName} entrou na sala</h1>
            <p>roomName: {data.userJoinedRoom.roomName}</p>
        </div>
    );
};

export default NewUserNotification;