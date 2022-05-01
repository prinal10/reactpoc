import React from 'react';
import {Link, Outlet, useNavigate} from "react-router-dom";
import AuthorizedComponent from "./AuthorizedComponent";
import {useAuth} from "../contexts/AuthContext";

const NavBar = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            //made it async incase there is a lot of clean up need to happen.
            await logout();
            navigate("/login", {replace: true});
        } catch (e) {
            //handle error
        }
    };
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
                <button className="btn btn-primary btn-large" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <Outlet/>
        </>
    );
};

export default NavBar;
