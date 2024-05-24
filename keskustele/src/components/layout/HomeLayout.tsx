import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "../sidebar/Navbar";
import "./homeLayoutStyles.css";
import {IChatroom} from "../../common/models/IChatroom";

/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 10/05/2024
 * Time: 22:10
 **/


interface HomeLayoutProps{
    chatrooms: IChatroom[] |undefined
}

const HomeLayout:React.FC<HomeLayoutProps> = ({chatrooms}) => {
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