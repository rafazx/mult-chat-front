import gql from 'graphql-tag';
import { useSubscription } from "@apollo/react-hooks";
import React from 'react';
import { toast } from 'react-toastify';

const SUBSCRIPTION_USER_LEAVE = gql`
    subscription{
        userLeaveRoom{
            nickName
            roomName
    }
    }
`;

const NewUserLeaveNotification: React.FC = () => {
    const { data, error } = useSubscription(SUBSCRIPTION_USER_LEAVE);
    if(error) {
        return <div>Error! {error.message}</div>
    }
    if(data && data.userLeaveRoom.roomName === localStorage.getItem('roomName')) {
        toast.warning(`Usuário : ${data.userLeaveRoom.nickName} saiu da Sala!`, {
            toastId: "leaveUserId"
        });
    }
    return (
        <div>
        </div>
    );
};

export default NewUserLeaveNotification;