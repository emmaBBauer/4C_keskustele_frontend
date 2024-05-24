import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SignUp from './components/signUp/SignUp';
import Login from './components/login/Login';
import HomeLayout from './components/layout/HomeLayout';
import Homepage from './components/homepage/Homepage';
import UserContextProvider from './common/context/UserContext';
import ChatroomHome from "./components/chatroom/ChatroomHome";
import {IChatroom} from "./common/models/IChatroom";
import axios from "axios";
import {StompSessionProvider} from "react-stomp-hooks";

function App() {
    const [chatrooms, setChatrooms] = useState<IChatroom[]>();

    useEffect(() => {
        axios.get("http://localhost:42069/chatroom/all")
            .then(value => setChatrooms(value.data));
    }, []);

    return (
        <div className="App">
            <StompSessionProvider url={"http://localhost:42069/messages"}>
            <UserContextProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<SignUp />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                            <Route element={<HomeLayout  chatrooms={chatrooms}/>}>
                                <Route path="/homepage" element={<Homepage />} />
                                    {
                                        chatrooms?.map(value => (
                                            <Route key={value.id} path={`/chatroom/${value.id}`} element={<ChatroomHome chatroom={value}/>}/>
                                        ))
                                    }
                                    </Route>
                        </Route>
                    </Routes>
                </Router>
            </UserContextProvider>
            </StompSessionProvider>
        </div>
    );
}

export default App;
