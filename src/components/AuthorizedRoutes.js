import React from 'react';
import {useAuth} from "../contexts/AuthContext";
import {Navigate} from "react-router-dom";
import isAuthorized from "../utils/jwtUtils";


const AuthorizedRoutes = ({component: Component, hasAllScopes, hasAnyScopes, redirectToOnFailure = ""}) => {
    // console.log("in Authorize Routes");
    const {jwtData} = useAuth();
    const scopes = jwtData ? jwtData.scope : null;
    const toPath = redirectToOnFailure ? redirectToOnFailure : "/";
    // console.log(JSON.stringify(jwtData, null, 2));
    return (
        <>
            {isAuthorized(hasAllScopes, hasAnyScopes, scopes) ? <Component/> : <Navigate to={toPath}/>}
        </>
    );
};

export default AuthorizedRoutes;
