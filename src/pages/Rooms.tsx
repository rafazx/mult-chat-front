import { gql, useQuery } from "@apollo/client";
import React from "react";
import ListRooms from "../components/ListRooms";
import { toast } from 'react-toastify';
import '../styles/Rooms.css'

const GET_ALL_ROOMS = gql`
    query {
        getAllRooms{
        name
    }
    }`;

const Rooms: React.FC = () => {
    const { error, data } = useQuery(GET_ALL_ROOMS);
    if(error) {
        toast.error(error.message);
    }
    if(data) {
        return (
            <div className="outerContainer">
            <div className="container">
                <ListRooms rooms={data.getAllRooms}/>
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