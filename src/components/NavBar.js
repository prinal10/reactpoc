import React from 'react';
import {Link, Outlet} from "react-router-dom";
import AuthorizedComponent from "./AuthorizedComponent";

const NavBar = () => {
    return (
        <>
            <div className="ui secondary pointing menu">
                <Link to="/" className="item">
                    Home
                </Link>
                <AuthorizedComponent hasAnyScopes={["etrans:eligibilitiesEnabled"]}>
                    <Link to="/admin" className="item">
                        Admin
                    </Link>
                </AuthorizedComponent>
                <Link to="/profile" className="item">
                    Profile
                </Link>
            </div>
            <Outlet/>
        </>
    );
};

export default NavBar;
