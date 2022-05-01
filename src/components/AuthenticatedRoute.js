import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

const AuthenticatedRoute = () => {
    // console.log("in Authenticated Routes")
    let location = useLocation();
    const {jwtData} = useAuth();
    return (
        <>
            {jwtData ? <Outlet/> :
                <Navigate to="/login" state={{from: location}} replace/>}
        </>
    );
};

export default AuthenticatedRoute;
