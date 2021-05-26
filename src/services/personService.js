import http from "./httpService";
import { apiEndpoint } from "../config.json";

// login/register a person (guess, student, admin, faculty)
const loginRegisterUser = (userInfo) => {
    return http.post(`${apiEndpoint}/users/create`, userInfo, {
        withCredentials: true,
    });
};

// logout user
const logoutUser = (userInfo) => {
    return http.post(`${apiEndpoint}/users/logout`, userInfo, {
        withCredentials: true,
    });
};

// read data of a person
const readUser = (userInfo) => {
    return http.get(`${apiEndpoint}/search/:googleID`, userInfo, {
        withCredentials: true,
    });
};

// edit data of a person

//delete person

// put here your newly made functions to export, then "exportFunctions" itself will be the one to be exported
const exportFunctions = {
    loginRegisterUser,
    logoutUser,
};

export default exportFunctions;
