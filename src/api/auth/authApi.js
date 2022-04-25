import axios from "axios";
import {Auth_BaseURL} from "../../configs/API_CONFIGS";

const authenticateAndGetJWT = (username, password) => {
    return axios.create({
        baseURL: Auth_BaseURL,
        params: {
            grant_type: "password",
            username,
            password
        },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
};

export default authenticateAndGetJWT;
