// @flow
import { type } from 'os';
import * as React from 'react';

type Props = {
    message: string;
    SetMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: (message: string) => {};
}

const Input = ({ message, SetMessage, sendMessage}: Props) =>{
    return (
        <form className="form">
            <input
                    placeholder="Digete a Mensagem"
                    value={message}
                    onChange={e => SetMessage(e.target.value)}
            />
            <button className="sendButtom" onClick={(e) => sendMessage(message)}>Enviar</button>
        </form>
    );
};

export default Input;