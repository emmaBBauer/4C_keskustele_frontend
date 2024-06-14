import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "../sidebar/Navbar";
import "./homeLayoutStyles.css";
import {IChatroom} from "../../common/models/IChatroom";
import {getAllChatrooms} from "../../common/api/API_Access_Chatroom";
import {useUserContext} from "../../common/context/UserContext";
import {dark} from "@mui/material/styles/createPalette";

/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 10/05/2024
 * Time: 22:10
 **/


interface HomeLayoutProps{
}

const HomeLayout:React.FC<HomeLayoutProps> = () => {
    const [chatrooms, setChatrooms] = useState<IChatroom[]|undefined>();
    const {user} = useUserContext();

    useEffect(() => {
        getAllChatrooms(user?.token)
            .then(data => setChatrooms(data))
            .then(data => {
                console.log("HALLO")
                console.log(data)
            });
    }, []);

    return (
        <div className="home-layout-container">
            <Navbar chatrooms={chatrooms}/>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    );
};

export default HomeLayout;