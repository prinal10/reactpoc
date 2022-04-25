import React from 'react';
import {useAuth} from "../contexts/AuthContext";

const Profile = () => {
    const {jwtData} = useAuth();
    return (
        <>
            <div>
                Hi {jwtData.userName}!
            </div>
        </>
    );
};

export default Profile;
