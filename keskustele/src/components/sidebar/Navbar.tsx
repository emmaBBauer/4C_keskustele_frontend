import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import './navbarStyles.css';
import UserField from "../userField/UserField";
import { IChatroom } from "../../common/models/IChatroom";
import CreateChatroomPopup from "./CreateChatroomPopup";
import Button from "@mui/material/Button";
import {createNewChatroomAPI, getAllChatrooms} from "../../common/api/API_Access_Chatroom";
import {useUserContext} from "../../common/context/UserContext";

interface NavbarProps {
    chatrooms: IChatroom[] | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ chatrooms }) => {
    const [sidebar, setSidebar] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [chatroomss, setChatroomss] = useState<IChatroom[] >(chatrooms ? chatrooms : []);
    const {user} = useUserContext();

   useEffect(() => {
        setChatroomss(chatrooms ? chatrooms : []);
    }, [chatrooms]);




    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const showSidebar = () => {
        setSidebar(!sidebar);
    };

    const handleCreateChatroom = (name: string, picPath: string) => {
        /*{
    "id":"null",
    "name":"History",
    "picPath": "/",
    "creator": {
        "id": "44eb4ad7-7ac7-4c32-96a5-2f76b0c5ba6d",
        "username": "a@a.at",
        "email": "a@a.at",
        "password": "a"
    }

}*/
        const newChatroom:IChatroom = {
            id: undefined,
            name: name,
            picPath: picPath,
            creator: {
                id: user?.id,
                username: user?.username,
                email: user?.email,
                password: user?.password
            }
        }

        createNewChatroomAPI(newChatroom, user?.token)
            .then(value => value ? setChatroomss([...chatroomss, value]) : console.log("did not work"));
        handleClosePopup();

        if (user?.token) {
            getAllChatrooms(user.token)
                .then(value => setChatroomss(value));
        }
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
                            <UserField />
                        </li>
                        <li key={100000000000}>
                            <Link to={"/homepage"} style={{ display: "flex", gap: 5, alignItems: "center" }}>
                                <FaIcons.FaTasks />
                                <span>Home</span>
                            </Link>
                        </li>
                        {chatroomss?.map((item, index) => (
                            <li key={index} className={item.name}>
                                <Link to={`/chatroom/${item.name}`} key={index} style={{ display: "flex", gap: 5, alignItems: "center" }}>
                                    <img src={item.picPath}  />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Button onClick={handleOpenPopup}>
                                Create Chatroom
                            </Button>
                            <CreateChatroomPopup
                                open={popupOpen}
                                onClose={handleClosePopup}
                                onCreate={handleCreateChatroom}
                            />
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
};

export default Navbar;
