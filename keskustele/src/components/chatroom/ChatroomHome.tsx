import React, { useState } from 'react';
import ChattingField from "./ChattingField";
import ForwardIcon from "@mui/icons-material/Forward";
import OnlineUsersField from "./OnlineUsersField";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import { useMessageContext } from "../../common/context/MessageContext";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../common/context/UserContext";
import { IMessage } from "../../common/models/IMessage";

/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 22/05/2024
 * Time: 14:30
 **/

function ChatroomHome() {
    const [textInput, setTextInput] = useState("");
    const { messages, setMessages } = useMessageContext();
    const { name: chatroomName } = useParams<{ name: string }>();
    const { user } = useUserContext();
    const stompClient = useStompClient();

    const handleOnClick = () => {
        if (textInput.trim() === "") return;

        const newMessage: IMessage = {
            messageId: undefined,
            chatroomId: chatroomName || "",
            content: textInput,
            time: new Date(),
            author: user ? user: undefined,
            chatroom: undefined
        };

        stompClient?.publish({
            destination: `/app/post/${chatroomName}`,
            body: JSON.stringify(newMessage),
        });

        setMessages([...messages, newMessage]);
        setTextInput("");
    };

    return (
        <div className="pageContainer">
            <ChattingField chatroomName={chatroomName}  />
            <OnlineUsersField />
            <div className="messageContainer">
                <input
                    type="text"
                    className="messageInput"
                    placeholder="Enter message"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                />
                <ForwardIcon onClick={handleOnClick} />
            </div>
        </div>
    );
}

export default ChatroomHome;
