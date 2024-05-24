import React from 'react';
import {useUserContext} from "../../common/context/UserContext";
import "./userFieldStyles.css"
import PersonIcon from '@mui/icons-material/Person';

interface UserFieldProps{

}

const UserField:React.FC<UserFieldProps> = () => {
    const userContext = useUserContext();

    return (
        <div className={"userField"}>
            <PersonIcon/> <h3>Hello {userContext.user?.email}</h3>
            <button className={"buttonSettings"}>Settings</button>
            <button className={"buttonSettings"}>Logout</button>
        </div>
    );
};

export default UserField;