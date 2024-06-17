import React from 'react';
import {IMessage} from "../../common/models/IMessage";
import "./chatroomStyles.css"

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
        <div className="message">
            <span>{messageToDisplay.author?.username}</span>
            <span style={{wordBreak: "break-word", textAlign: "start"}}>{messageToDisplay.content}</span>

        </div>
    );
};

export default Message;