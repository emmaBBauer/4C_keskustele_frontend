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
import { createNewChatroomAPI } from "../../common/api/API_Access_Chatroom";
import { useUserContext } from "../../common/context/UserContext";

interface NavbarProps {
    chatrooms: IChatroom[] | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ chatrooms }) => {
    const [sidebar, setSidebar] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [chatroomss, setChatroomss] = useState<IChatroom[]>(chatrooms??[]);
    const { user } = useUserContext();

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

    const handleCreateChatroom = async (name: string, picPath: string) => {
        const newChatroom: IChatroom = {
            id: undefined,
            name: name,
            picPath: picPath,
            creator: {
                id: user?.id,
                username: user?.username,
                email: user?.email,
                password: user?.password
            }
        };

        try {
            const createdChatroom = await createNewChatroomAPI(newChatroom, user?.token);
            console.log("created", createdChatroom)
            if(createdChatroom === undefined) return;

            console.log("set")
            setChatroomss(prevChatrooms => [...prevChatrooms, createdChatroom]);
        } catch (error) {
            console.error("Error creating chatroom:", error);
        } finally {
            handleClosePopup();
        }
    };

    return (
        <>
            <IconContext.Provider value={{ color: "#818cf8" }}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose/>
                            </Link>
                        </li>
                        <div className={"seperator"}/>
                        <li>
                            <div style={{padding: "8px 0 8px 0"}}>
                                <FaIcons.FaUser/>
                                <span
                                    style={{color: "white", fontSize: 20, marginLeft: 8}}>Hello {user?.username}</span>
                            </div>
                        </li>
                        <li key={100000000000}>
                            <Link to={"/homepage"} style={{display: "flex", gap: 5, alignItems: "center"}}>
                                <FaIcons.FaHome/>
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/settings"} style={{display: "flex", gap: 5, alignItems: "center"}}>
                                <FaIcons.FaSlidersH/>
                                <span>Settings</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/login"} style={{display: "flex", gap: 5, alignItems: "center"}}>
                                <FaIcons.FaUserSlash/>
                                <span>Logout</span>
                            </Link>
                        </li>
                        <div className={"seperator"}/>

                        {chatroomss.map((item, index) => (
                            <li key={item.id || index} className={item.name}>
                                <Link to={`/chatroom/${item.name}`}
                                      style={{display: "flex", gap: 5, alignItems: "center"}}>
                                    <FaIcons.FaAngleRight/>
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
