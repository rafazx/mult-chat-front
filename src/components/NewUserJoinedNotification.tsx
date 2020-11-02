import gql from 'graphql-tag';
import { useSubscription } from "@apollo/react-hooks";
import React from 'react';
import { toast } from 'react-toastify';

const SUBSCRIPTION_USER_JOINED = gql`
    subscription{
        userJoinedRoom{
            nickName
            roomName
    }
    }
`;

const NewUserJoinedNotification: React.FC = () => {
    const { data, error } = useSubscription(SUBSCRIPTION_USER_JOINED);
    if(error) {
        return <div>Error! {error.message}</div>
    }
    console.log(data)
    if(data && data.userJoinedRoom && data.userJoinedRoom.roomName === localStorage.getItem('roomName')) {
        toast.warning(`Usuário : ${data.userJoinedRoom.nickName} entrou na Sala!`);
    }

    return (
        <div></div>
    )

};

export default NewUserJoinedNotification;