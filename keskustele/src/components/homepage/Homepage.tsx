import React from 'react';
import {useUserContext} from "../../common/context/UserContext";
import {IUser} from "../../common/models/IUser";

/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 15/05/2024
 * Time: 14:30
 **/


const Homepage = () => {
    const userContext = useUserContext();
    {console.log("USERRRRR   " +userContext.user?.passwort)}
    return (
        <div className={"mainTextDiv"}>
            <h1>Please select a chatroom...</h1>
        </div>
    );
};

export default Homepage;

