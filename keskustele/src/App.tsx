import React from 'react';
import './App.css';
import '../src/components/login/Login'
import Login from "./components/login/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout";
import SignUp from "./components/signUp/SignUp";

function App() {
  return (
    <div className="App">
        <h1>Keskustele</h1>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<SignUp/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/login" element={<Login/>}/>

                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
