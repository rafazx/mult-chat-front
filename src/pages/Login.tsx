import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import '../styles/Login.css';

const CREATE_USER = gql`
  mutation CreateUser($nickName: String!) {
    createUser(nickName: $nickName){
      nickName
    }
  }
`;

const Login: React.FC = () => {
  const [nickName, setNickName] = useState("");
  const [addUser] = useMutation(CREATE_USER);
  const history = useHistory();

  async function handleSubmit(event: React.FormEvent): Promise<any> {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: {
          nickName
        }
      })
      localStorage.setItem('nickName', data.createUser.nickName)
      history.push('/rooms');
    } catch (error) {
      setNickName("");
      toast.error(error.message)
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Mult-Chat</h1>
        <form onSubmit={handleSubmit}>
            <input
            placeholder="Escolha o seu NickName"
            className="joinInput"
            value={nickName}
            onChange={e => setNickName(e.target.value)}
            />
            <button 
            type="submit"
            className={'button mt-20'}
            >
                Entrar no Chat
            </button>
        </form>
      </div>
    </div>
  );
}

export default Login;