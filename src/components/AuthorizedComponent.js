import React from 'react';
import {useAuth} from "../contexts/AuthContext";
import isAuthorized from "../utils/jwtUtils";

const AuthorizedComponent = ({children, hasAllScopes, hasAnyScopes}) => {
    // console.log("in Authorize Component");
    const {jwtData} = useAuth();
    const scopes = jwtData ? jwtData.scope : null;
    return (
        <>
            {isAuthorized(hasAllScopes, hasAnyScopes, scopes) ? children : null}
        </>
    );
};

export default AuthorizedComponent;
