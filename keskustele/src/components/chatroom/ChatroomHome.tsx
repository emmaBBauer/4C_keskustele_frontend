import React, {useState} from 'react';
import ChattingField from "./ChattingField";
import ForwardIcon from "@mui/icons-material/Forward";
import OnlineUsersField from "./OnlineUsersField";
import {IMessage, mockMessages} from "../../common/models/IMessage";
import {mockUsers} from "../../common/models/IUser";
import {IChatroom} from "../../common/models/IChatroom";
import {useSubscription} from "react-stomp-hooks";

/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 22/05/2024
 * Time: 14:30
 **/


interface ChatroomHomeProps{
    chatroom: IChatroom
}

const ChatroomHome:React.FC<ChatroomHomeProps> = ({chatroom}) => {
    const [textInput, setTextInput] = useState<string>("");
    const handleOnClick = () => {
        const m = {
            //set undefined
            messageId: `msg${mockMessages.length + 1}`,
            chatroomId: 'chat2',
            content: textInput,
            time: new Date(Date.now()),
            user: mockUsers[2]
        };
        mockMessages.push(m)
        console.log(m)
        setTextInput("");
    }

    useSubscription("/chatroom/"+ chatroom.name + "/messages", (message) => {
        return{
            //set undefined
            messageId: `msg${mockMessages.length + 1}`,
            chatroomId: 'chat2',
            content: textInput,
            time: new Date(Date.now()),
            user: mockUsers[2]
        };
    });

    return (
        <div className={"pageContainer"}>
            <ChattingField chatroom={chatroom}/>

            <OnlineUsersField/>

            <div className={"messageContainer"}>
                <input
                    type="text"
                    className="messageInput"
                    placeholder="Enter message"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}/>

                <ForwardIcon onClick={handleOnClick}/>
            </div>
        </div>
    );
};

export default ChatroomHome;