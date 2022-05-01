import React from 'react';
import {useAuth} from "../contexts/AuthContext";
import {Navigate} from "react-router-dom";


const isAuthorized = (hasAllScopes, hasAnyScopes, userScopes) => {
    if (!hasAllScopes && !hasAnyScopes) {
        //may be throw exception
        return true;
    }
    if (!userScopes) {
        return false;
    }
    return checkForAllScopes(hasAllScopes, userScopes) && checkForAnyScopes(hasAnyScopes, userScopes);
}

const checkForAllScopes = (hasAllScopes, userScopes) => {
    if (!hasAllScopes) {
        return true;
    }
    return userScopes.every(element => {
        return hasAllScopes.includes(element);
    });
}

const checkForAnyScopes = (hasAnyScopes, userScopes) => {
    if (!hasAnyScopes) {
        return true;
    }
    return !!userScopes.find(scope => {
        return hasAnyScopes.includes(scope);
    });
}

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
