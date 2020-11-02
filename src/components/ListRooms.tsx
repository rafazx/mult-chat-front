import React from 'react';
import { useHistory } from 'react-router-dom';

type Rooms = {
    rooms: [{name: string}]
}

interface Room {
    name: string;
}

const ListRooms = ({rooms}: Rooms) => {
    const history = useHistory();

    function click(roomName: string){
        localStorage.setItem("roomName",roomName);
        history.push('/chat', { roomName: roomName })   
    }

    return (
        <div>
            <h1>Salas</h1>
            <ul>
                {rooms.map((e: Room) => (
                    <li onClick={() => click(e.name)} key={e.name}>{e.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListRooms;