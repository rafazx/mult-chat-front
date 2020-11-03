// @flow
import React from 'react';
import '../styles/Input.css'

type Props = {
    message: string;
    SetMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: (event:React.MouseEvent, message: string) => {};
}

const Input = ({ message, SetMessage, sendMessage}: Props) =>{
    return (
        <form className="formChat">
            <input
                    className="inputChat"
                    placeholder="Digete a Mensagem"
                    value={message}
                    onChange={(e => SetMessage(e.target.value))}
            />
            <button className="sendButtom" onClick={(e) => sendMessage(e, message)} >Enviar</button>
        </form>
    );
};

export default Input;