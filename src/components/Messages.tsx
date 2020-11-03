import React, { memo, useEffect } from 'react';
import moment from 'moment';
import '../styles/Messages.css'

interface Message {
    text: string;
    createdAt: Date;
    nickName: string;
}

type Props = {
    messages: Message[]
}

const Messages = ({ messages }: Props) => {
    return(
      <div className="messagesChat">
        {messages && messages.length > 0 ? 
        messages.map((e : Message, index: number) => {
            return e.nickName === localStorage.getItem('nickName') ?
                <div className="mySendMessage" key= {index}>
                    <div><span className="dateChat">{moment(e.createdAt).format('DD-MM-YYYY HH:mm:ss')}</span>-<strong className="nickNameChat">{e.nickName}</strong></div>
                    <div className="textChat">{e.text}</div>
                </div>
            :
                <div className="otherSendMessage" key= {index}>
                    <div><span className="dateChat">{moment(e.createdAt).format('DD-MM-YYYY HH:mm:ss')}</span>-<strong className="nickNameChat">{e.nickName}</strong></div>
                    <div className="textChat">{e.text}</div>
                </div>
        }) 
        : 
        <div>Nao existe Mensagens para essa Sala</div> 
        }
      </div>
    )
};

export default memo(Messages);