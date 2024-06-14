import React from 'react';
import {IUser} from "../../common/models/IUser";
import "./userStyles.css"

/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 22/05/2024
 * Time: 14:40
 **/


interface UserComponentProps{
    user: IUser
}

const UserCOmponent:React.FC<UserComponentProps> = ({user}) => {
    return (
            <div className={"userComponentStyles"}>
                <p>{user.username ?? 'N/A'}</p>
            </div>
    );
};

export default UserCOmponent;