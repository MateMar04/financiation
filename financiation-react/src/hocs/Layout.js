import React from "react";
import NavScrollExample from "../components/Navbar";

const Layout = (props) => (
    <div>
        <NavScrollExample/>
        {props.children}
    </div>
);

export default Layout;