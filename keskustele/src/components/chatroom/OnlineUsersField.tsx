import React, {useState} from 'react';
import {IUser, mockUsers} from "../../common/models/IUser";
import UserCOmponent from "./UserCOmponent";

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
    return (
        <>
            <div className={"onlineUsersContainer"}>

                     <ul className={"onlineUsersList"}>
                         {
                             onlineUsers?.map(value => (
                                     <li>
                                         <UserCOmponent key={value.id} user={value}/>
                                     </li>
                             ))
                         }

                     </ul>


            </div>

        </>
    );
};

export default OnlineUsersField;