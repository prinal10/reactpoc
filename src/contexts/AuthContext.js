import React, {useContext, useState} from "react";
import jwt_decode from "jwt-decode";


import authApi from "../api/auth/authApi";
import {getDataFromLocalStorage, removeDataFromLocalStorage, setDataWithExpiry} from "../utils/localStorageUtils";

const AuthContext = React.createContext(null);
const JWT_KEY = "jwtToken";

export function useAuth() {
    return useContext(AuthContext);
}

const checkAndGetJwtDataFromLocalStorage = () => {
    const localData = getDataFromLocalStorage(JWT_KEY);
    if (!localData) {
        return null;
    }
    return jwt_decode(localData);

}
//hoc
export const AuthContextProvider = ({children}) => {
        //console.log("in AuthContext");
        const [jwtData, setJwtData] = useState(checkAndGetJwtDataFromLocalStorage());

        const login = async (username, password) => {
            //call authAPI
            const {data} = await authApi(username, password).post("/ds/accesstoken");
            //set local storage data
            setJwtData(jwt_decode(data.access_token));
            // eslint-disable-next-line no-undef
            setDataWithExpiry(JWT_KEY, data.access_token, 6000000);
            //console.log(JSON.stringify(jwt_decode(data.access_token), null, 2));

        };
        const logout = async () => {
            removeDataFromLocalStorage(JWT_KEY);
            setJwtData(null);
        };
        const value = {jwtData, login, logout};
        return (
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        );
    }
;

export default AuthContext;
