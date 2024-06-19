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
import MessageContextProvider from "./common/context/MessageContext";
import Settings from "./components/Settings";
import {ChatroomProvider} from "./common/context/ChatroomContext";

function App() {


    return (
        <div className="App">
            <StompSessionProvider url={"ws://localhost:42069/messages"}>
                <ChatroomProvider>
             <MessageContextProvider>
                 <UserContextProvider>
                     <Router>
                         <Routes>
                             <Route path="/" element={<Layout />}>
                                 <Route index element={<SignUp />} />s
                                 <Route path="/signup" element={<SignUp />} />
                                 <Route path="/login" element={<Login />} />
                                 <Route element={<HomeLayout/>}>
                                     <Route path="/homepage" element={<Homepage />} />
                                     <Route  path={`/chatroom/:name`} element={<ChatroomHome/>}/>
                                     <Route path={"/settings"} element={<Settings/>}/>
                                 </Route>
                             </Route>
                         </Routes>
                     </Router>
                 </UserContextProvider>
             </MessageContextProvider>
                </ChatroomProvider>
            </StompSessionProvider>
        </div>
    );
}

export default App;
