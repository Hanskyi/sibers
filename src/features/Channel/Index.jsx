import React, {useEffect} from 'react';
import SideBar from "@/features/Channel/SideBar/Index.jsx";
import Messaging from "@/features/Channel/Messaging/index.jsx";
import store from "./store.js";

const Channel = () => {
    useEffect(() => {
        store.getAllChannels()
        store.getUserLocalStorage()
    },[])
    return (
        <div className="flex">
            <SideBar/>
            <Messaging/>
        </div>
    );
};

export default Channel;