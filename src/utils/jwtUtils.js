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

export default isAuthorized;