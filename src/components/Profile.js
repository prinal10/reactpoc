import React from 'react';
import {useAuth} from "../contexts/AuthContext";

const Profile = () => {
    const {jwtData} = useAuth();
    return (
        <>
            <h1>
                Hi {jwtData.userName.toUpperCase()}!
            </h1>
        </>
    );
};

export default Profile;
