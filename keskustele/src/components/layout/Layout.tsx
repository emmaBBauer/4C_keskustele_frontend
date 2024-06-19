import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "../sidebar/Navbar";

/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 3/04/2024
 * Time: 08:20
 **/

const Layout = () => {
    return (
        <div style={{backgroundColor: "202020"}}>
            <Outlet/>
        </div>
    );
};

export default Layout;