import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SideBarData';
import { IconContext } from 'react-icons';
import './navbarStyles.css';
import {useUserContext} from "../../common/context/UserContext";
import UserField from "../userField/UserField";
import {IChatroom, mockChatrooms} from "../../common/models/IChatroom";
import axios from "axios";

interface NavbarProps{
    chatrooms: IChatroom[]|undefined
}

const Navbar:React.FC<NavbarProps> = ({chatrooms}) => {
    const [sidebar, setSidebar] = useState(false);




    const showSidebar = () => {
        setSidebar(!sidebar);
    };

    return (
        <>
            <IconContext.Provider value={{ color: undefined }}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        <li>
                            <UserField/>
                        </li>
                        <li  key={100000000000}>
                            <Link to={"/homepage"}>
                                <FaIcons.FaTasks/>
                                <span>Home</span>
                            </Link>
                        </li>
                        {chatrooms?.map((item) => {
                            return (
                                <li key={item.id} className={item.name}>
                                    <Link to={`/chatroom/${item.id}`}>
                                        <img src={item.picPath} alt={":("}/>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
};

export default Navbar;
