import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';

import React, { useEffect, useState } from 'react';

import './Sidebar.css';
import SidebarChat from "./SidebarChat";
import db from './firebase';



function Sidebar() {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        db.collection("rooms").onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ))

    }, [])

    return (
        <div className="sidebar">

            <div className="sidebar__header">
                <Avatar />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start a new chat" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>{/* add this function from sidebarchat...its a prop of sidebarchat */}
                {rooms.map((room) => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                    // now pass these into props into SidebarChat function
                ))}
            </div>
        </div>
    )
}


export default Sidebar
