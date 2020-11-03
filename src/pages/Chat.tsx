// @flow
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Messages from '../components/Messages';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import NewUserLeaveNotification from '../components/NewUserLeaveNotification';
import NewUserJoinedNotification from '../components/NewUserJoinedNotification';
import '../styles/Chat.css'
import { toast } from 'react-toastify';

const USER_LEAVE_ROOM = gql`
mutation LeaveRoom($roomName: String!, $nickName: String!){
    leaveRoom(roomName: $roomName, nickName: $nickName){
      nickName
    }
  }
`;

const GET_MESSAGES_IN_ROOM = gql`
    query  GetMessagesInRoom($roomName: String!){
        getMessagesInRoom(roomName: $roomName){
        text
        nickName
        roomName
        createdAt
        }
}`;


const SEND_MESSAGE = gql`
    mutation SendMessage($message: CreateMessageDto!)
    {
        sendMessage(message: $message){
        text
        nickName
        roomName
        createdAt
        }
}`;

const SUBSCRIPTION_MESSAGE_ADDED = gql`
    subscription{
        messageAdded{
        text
        nickName
        roomName
        createdAt
    }
  }`;


interface Message {
    text: string;
    createdAt: Date;
    nickName: string;
}

const Chat: React.FC = () => {
    const history = useHistory();
    const nickName = localStorage.getItem('nickName');
    const roomName = localStorage.getItem('roomName');
    const [messages, SetMessages] = useState<Message[]>([]);
    const [message, SetMessage] = useState('');
    const options = messages && messages.length > 0 ? { skip: true } : { skip : false , variables : { roomName : roomName}}
    const getMessages = useQuery(GET_MESSAGES_IN_ROOM, options);
    const subscriptionMessage = useSubscription(SUBSCRIPTION_MESSAGE_ADDED, {
        shouldResubscribe: true
    });
    const [addMessage] = useMutation(SEND_MESSAGE);
    const [userLeaveRoom] = useMutation(USER_LEAVE_ROOM);

    if(getMessages?.data?.getMessagesInRoom) {
        getAllMessages();
    }

    function getAllMessages() {
        SetMessages(getMessages.data.getMessagesInRoom)
    }


    useEffect(() => {
        if(subscriptionMessage?.data?.messageAdded?.roomName === roomName) {
            const newMessages: Message[] = [...messages,subscriptionMessage.data.messageAdded]
            SetMessages(newMessages);
        }
    },[subscriptionMessage?.data?.messageAdded])

    async function sendMessage(event: React.MouseEvent, message: string) {
        try {
            event.preventDefault();
            await addMessage({
                variables: {
                  message : {
                      text: message,
                      roomName: roomName,
                      nickName: nickName
                  }
                }
              })
              SetMessage('');
        } catch (error) {
            toast.warning('Error ao carregar Mensagem', {
                toastId: 'errorMessage'
            })
        }
    }

    function leaveRoom(event: React.MouseEvent) {
        event.preventDefault();
        userLeaveRoom({
            variables: {
                roomName: roomName,
                nickName: nickName
            }
        })
        localStorage.removeItem('roomName');
        history.push('/rooms');
    }

    return (
        <div className="outerContainerChat">
            <div className="header">
                <h1 className="heading">{roomName}</h1>
                <button onClick={leaveRoom} className="exitChat">Sair</button>
            </div>
        <div className="chatContainer">
            <Messages messages={messages} />
            <Input message={message} SetMessage={SetMessage} sendMessage={sendMessage}/>
        </div>
        <NewUserJoinedNotification />
        <NewUserLeaveNotification />
      </div>
    );
  };

export default Chat;