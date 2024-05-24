import React, {useState} from 'react';
import "./chatroomStyles.css";
import ForwardIcon from '@mui/icons-material/Forward';
import {IMessage, mockMessages} from "../../common/models/IMessage";
import Message from "./Message";
import {useSubscription} from "react-stomp-hooks";
import {IChatroom} from "../../common/models/IChatroom";

/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 22/05/2024
 * Time: 15:10
 **/


interface ChattingFieldProps{
    chatroom: IChatroom
}

const ChattingField:React.FC<ChattingFieldProps> = ({chatroom}) => {
    const [messages, setMessages] = useState<IMessage[]>(mockMessages);

    useSubscription("/chatroom/"+ chatroom.name + "/messages", (message) => {
        const arr: IMessage[] =  JSON.parse(message.body);
        setMessages(arr);
        console.log(arr);
    });

    return (
        <>
            <div className={"chatContainer"}>
                <div
                    style={{
                        padding: 20,
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,
                    }}
                >
                {messages?.map(message => (
                    <Message key={message.messageId} messageToDisplay={message}/>
                ))}
                </div>
            </div>


        </>

    );
};

export default ChattingField;