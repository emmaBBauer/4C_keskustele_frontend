import React from 'react';
import {IMessage} from "../../common/models/IMessage";

/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 22/05/2024
 * Time: 15:50
 **/


interface MessageProps{
    messageToDisplay: IMessage
}


const Message:React.FC<MessageProps> = ({messageToDisplay}) => {
    return (
        <div>
            {messageToDisplay.user.username}:
            <br/>
            {messageToDisplay.content}
            <br/>
            <br/>
        </div>
    );
};

export default Message;