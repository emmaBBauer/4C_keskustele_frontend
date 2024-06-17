import React, {useEffect, useRef, useState} from 'react';
import "./chatroomStyles.css";
import { IMessage } from "../../common/models/IMessage";
import Message from "./Message";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import { useMessageContext } from "../../common/context/MessageContext";
import { getAllMessagesAPI } from "../../common/api/API_Acess_Message";
import { useUserContext } from "../../common/context/UserContext";

interface ChattingFieldProps {
    chatroomName: string | undefined;
}

const ChattingField: React.FC<ChattingFieldProps> = ({ chatroomName }) => {
    const { messages, setMessages } = useMessageContext();
    const { user } = useUserContext();
    const [newMessage, setNewMessage] = useState("");


    useEffect(() => {
        if (!chatroomName) return;

        getAllMessagesAPI(chatroomName, user?.token).then(data => {
            if (data === undefined) {
                alert("No messages available");
            }
            else
            {
                setMessages(data);
            }

        });
    }, [user?.token, chatroomName, setMessages]);

    useEffect(() => {
        console.log("Messages updated:", messages);
    }, [messages]);

    useSubscription(`/chatroom/${chatroomName}/messages`, (message) => {
        const incomingMessage: IMessage = JSON.parse(message.body);
        console.log("INCOMING: ")
        console.log(incomingMessage)
        if (incomingMessage.chatroom?.name === chatroomName) {
            setMessages( [...messages, incomingMessage]);
        }
        else{
            alert("hallo")
        }
    });


    const sendMessage = async () => {
        if (!chatroomName || !newMessage.trim()) return;

        const message = { content: newMessage, user: user?.username };
        try {
            const response = await fetch(`/post/${chatroomName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify(message)
            });

            if (response.ok) {
                const createdMessage = await response.json();
                setMessages( [...messages, createdMessage]);
                setNewMessage("");
            } else {
                const errorMessage = await response.text();
                console.error("Error sending message:", errorMessage);
                alert("Error sending message: " + errorMessage);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <div className="chatContainer">
            <div
                style={{
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    width: "100%",
                    height: "95%",
                    overflowY: "auto",
                    overflowX: "hidden"


                }}
            >
                {messages
                    .map((message, index) => (
                        <Message key={`${message.content}-${index}`} messageToDisplay={message} />
                    ))}
            </div>
        </div>
    );
};

export default ChattingField;
