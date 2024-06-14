import React from 'react';
import {useUserContext} from "../../common/context/UserContext";
import "./userFieldStyles.css"
import PersonIcon from '@mui/icons-material/Person';
import {Link, useNavigate} from "react-router-dom";
import * as FaIcons from "react-icons/fa";

interface UserFieldProps{

}

const UserField:React.FC<UserFieldProps> = () => {
    const userContext = useUserContext();
    const navigate = useNavigate();

    const handleOnClickSettings = () => {
        navigate("/settings");
    }

    const handleOnClickLogout = () => {
        userContext.setUser(undefined);
        navigate("/login");
    }

    return (
        <div className={"userField"}>
            <PersonIcon/>
            <h3>Hello {userContext.user?.username}</h3>
            <div style={{display: "flex", gap: 10}}>
                <button className={"buttonSettings"} onClick={handleOnClickSettings}>Settings</button>
                <button className={"buttonSettings"} onClick={handleOnClickLogout}>Logout</button>
            </div>
        </div>
    );
};

export default UserField;