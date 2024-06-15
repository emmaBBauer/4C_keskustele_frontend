import React, { useState } from 'react';
import ChattingField from "./ChattingField";
import ForwardIcon from "@mui/icons-material/Forward";
import OnlineUsersField from "./OnlineUsersField";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import { useMessageContext } from "../../common/context/MessageContext";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../common/context/UserContext";
import {IMessage, IMessageWithChatroom} from "../../common/models/IMessage";
import {getAllChatrooms} from "../../common/api/API_Access_Chatroom";
import {IChatroom} from "../../common/models/IChatroom";
import {IUserWithoutToken} from "../../common/models/IUser";

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
    const [chatrooms, setChatrooms] = useState<IChatroom[]>([]);


    const sendMessage = async (newMessage: IMessageWithChatroom) => {
        if (!chatroomName || !newMessage) return;

        console.log(newMessage);

        try {
            const response = await fetch(`http://localhost:42069/message/post/${chatroomName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify(newMessage)
            });

            if (response.ok) {
                const createdMessage = await response.json();
                setMessages( [...messages, createdMessage]);
            } else {
                const errorMessage = await response.text();
                console.error("Error sending message:", errorMessage);
                alert("Error sending message: " + errorMessage);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };


    const getRightChatroom = (): IChatroom|undefined => {
        chatrooms.map(c => {
            if(c.name == chatroomName)
            {
                alert(c)
                return c;
            }
        })
        return chatrooms ? chatrooms.at(0) : undefined;
    }

    const handleOnClick = () => {
        if (textInput.trim() === "") return;

        getAllChatrooms(user?.token)
            .then(data => setChatrooms(data));

        let u: IUserWithoutToken = {
            id: user?.id,
            username: user?.username,
            email: user?.email,
            password: user?.password
        }

        const newMessage: IMessageWithChatroom = {
            id: undefined,
            content: textInput,
            time: new Date(),
            author: u ? u : undefined,
            chatroom: getRightChatroom()
        };

        sendMessage(newMessage);

        /*stompClient?.publish({
            destination: `/app/post/${chatroomName}`,
            body: JSON.stringify(newMessage),
        });

        setMessages([...messages, newMessage]);
        setTextInput("");*/


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
