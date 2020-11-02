// @flow
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import React, { useState } from 'react';
import Messages from '../components/Messages';
import Input from '../components/Input';
import NewUserLeaveNotification from '../components/NewUserLeaveNotification';
import NewUserJoinedNotification from '../components/NewUserJoinedNotification';
import '../styles/Chat.css'

const GET_MESSAGES_IN_ROOM = gql`
    query   {
        getMessagesInRoom(page:1, roomName:"Sala01"){
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
    const nickName = localStorage.getItem('nickName');
    const roomName = localStorage.getItem('roomName');
    const [messages, SetMessages] = useState<[Message]>([
        {
            text: "ok",
            createdAt: new Date(),
            nickName: "test"
        }
    ]);
    const [message, SetMessage] = useState('');
    const options = messages && messages.length > 1 ? { skip: true} : { skip : false}
    const getMessages = useQuery(GET_MESSAGES_IN_ROOM, options);
    const [addMessage] = useMutation(SEND_MESSAGE);

    if(getMessages.data) {
        SetMessages(getMessages.data.getMessagesInRoom)
    }

    async function sendMessage(message: string) {
        try {
            const { data } = await addMessage({
                variables: {
                  message : {
                      text: message,
                      roomName: roomName,
                      nickName: nickName
                  }
                }
              })
              console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="outerContainer">
        <div className="container">
            <Input message={message} SetMessage={SetMessage} sendMessage={sendMessage}/>
            <Messages messages={messages} />
        </div>
      </div>
    );
  };

export default Chat;