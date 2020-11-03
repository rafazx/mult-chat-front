import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/ListRooms.css'
import { toast } from 'react-toastify';

type Rooms = {
    rooms: [{name: string}]
}

interface Room {
    name: string;
}

const JOINED_ROOM_MUTATION = gql`
mutation JoinedRoom($roomName: String!, $nickName: String!){
    joinedRoom(roomName: $roomName,nickName: $nickName)
    {nickName
    }
}`;


const ListRooms = ({rooms}: Rooms) => {
    const history = useHistory();
    const [joinedRoom] = useMutation(JOINED_ROOM_MUTATION);

    async function selectedRoom(roomName: string) {
        try {
            await joinedRoom({
                variables: {
                    roomName,
                    nickName: localStorage.getItem('nickName')
                }
            });
        } catch (error) {
            toast.warning('Erro ao Buscar Salas', {
                toastId: "rooms"
            })
        }
    }

    async function joinRoom(roomName: string){
        localStorage.setItem("roomName",roomName);
        await selectedRoom(roomName)
        history.push('/chat', { roomName: roomName })   
    }

    return (
        <div>
            <ul>
                {rooms.map((e: Room) => (
                    <li className="containerRoom" onClick={() => joinRoom(e.name)} key={e.name}>{e.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListRooms;