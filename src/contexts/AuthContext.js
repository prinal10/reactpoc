import React, {useContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";


import authApi from "../api/auth/authApi";
import {getDataFromLocalStorage, setDataWithExpiry} from "../utils/localStorageUtils";

const AuthContext = React.createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

//hoc
export const AuthContextProvider = ({children}) => {

        const [jwtData, setJwtData] = useState(null);
        const navigate = useNavigate();


        //useEffect
        useEffect(() => {
            const localData = getDataFromLocalStorage("jwtToken");
            if (!localData) {
                navigate("/login", {replace: true});
                return;
            }
            setJwtData(jwt_decode(localData));
            navigate("/", {replace: true});
            //redirect to home page.

        }, []); // eslint-disable-line react-hooks/exhaustive-deps


        const login = async (username, password) => {
            //call authAPI
            const {data} = await authApi(username, password).post("/ds/accesstoken");
            //set local storage data
            setJwtData(jwt_decode(data.access_token));
            // eslint-disable-next-line no-undef
            setDataWithExpiry("jwtToken", data.access_token, 60000);
            console.log(JSON.stringify(jwt_decode(data.access_token), null, 2));

        }
        const value = {jwtData, login};
        return (
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        );
    }
;

export default AuthContext;
