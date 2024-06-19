import React, {useEffect, useState} from 'react';
import {IUser, mockUsers} from "../../common/models/IUser";
import UserCOmponent from "./UserCOmponent";
import {getAllUsersAPI} from "../../common/api/API_Access_User";
import {useUserContext} from "../../common/context/UserContext";

/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 22/05/2024
 * Time: 14:38
 **/

interface OnlineUsersField{

}

const OnlineUsersField = () => {
    const [onlineUsers, setOnlineUsers] = useState<IUser[]>(mockUsers);
    const {user} = useUserContext();

    useEffect(() => {
        getAllUsersAPI(user?.token)
            .then(value => {
                if(value == undefined)
                {
                    alert("no users available")
                }
                else{
                    setOnlineUsers(value);
                }
            });
    }, []);

    return (
        <>
            <div className={"onlineUsersContainer"}>
                <a style={{color: "white", fontWeight: "bold"}}>All users</a>
                <div className={"onlineUsersList"}>
                    {
                        onlineUsers?.map(value => (
                            <UserCOmponent key={value.id} user={value}/>
                        ))
                    }

                </div>


            </div>

        </>
    );
};

export default OnlineUsersField;