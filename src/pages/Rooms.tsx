import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useHistory } from "react-router-dom";
import ListRooms from "../components/ListRooms";
import '../styles/Rooms.css'

const GET_ALL_ROOMS = gql`
    query {
        getAllRooms{
        name
    }
    }`;

const Rooms: React.FC = () => {
    const { data } = useQuery(GET_ALL_ROOMS);
    const history = useHistory();

    const leaveRoom = (event: React.MouseEvent) => {
        event.preventDefault();
        localStorage.removeItem('nickName');
        history.push('/')
    }

    if(data) {
        return (
            <div className="outerContainer">
            <h2 className="heading">Escolha sua Sala</h2>
            <div className="container">
                <ListRooms rooms={data.getAllRooms}/>
            </div>
            <div className="buttonContainer">
            <button 
            onClick={leaveRoom}
            className={'button mt-20'}
            >
                Sair
            </button>
            </div>
          </div>
        );
    }
    return (
        <div>
        </div>
    );
};

export default Rooms;