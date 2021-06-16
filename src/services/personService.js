import http from "./httpService";
import { apiEndpoint, jwtEncryptionKey } from "../config.json";
import * as jwtEncrypt from "jwt-token-encrypt";

// login/register a person (guest, student, admin, faculty)
const loginRegisterUser = (userInfo) => {
    return http.post(`${apiEndpoint}/users/create`, userInfo, {
        withCredentials: true,
    });
};

// get specific person
const getSpecificPerson = (userInfo) => {
    return http.post(`${apiEndpoint}/users/findperson`, userInfo);
};

// logout user
const logoutUser = (userInfo) => {
    return http.post(`${apiEndpoint}/users/logout`, userInfo, {
        withCredentials: true,
    });
};

// read data of a person
const readUser = (googleId) => {
    return http.get(
        `${apiEndpoint}/admin/search`,
        { params: { search: googleId } },
        {
            withCredentials: true,
        }
    );
};

// edit data of a person

//delete person
const deleteUser = (userInfo) => {
    return http.delete(`${apiEndpoint}/users/delete`, {
        data: {
            googleId: userInfo.googleId,
            email: userInfo.email,
            fullName: userInfo.fullName,
            userType: userInfo.userType,
            nickname: userInfo.nickname,
        },
        withCredentials: true,
    });
};

//update person
const updateNickname = (userInfo) => {
    return http.put(`${apiEndpoint}/users/update/`, userInfo, {
        withCredentials: true,
    });
};

//read data of all users
const readAllUsers = () => {
    return http.get(`${apiEndpoint}/admin/readAllUsers`, {
        withCredentials: true,
    });
};

// user filters, read data of admins only
const readAdmins = () => {
    return http.get(`${apiEndpoint}/admin/readAdmins`, {
        withCredentials: true,
    });
};

// read data of faculty only
const readFaculty = () => {
    return http.get(`${apiEndpoint}/facultystaff/readFaculty`, {
        withCredentials: true,
    });
};

// read data of Staff only
const readStaff = () => {
    return http.get(`${apiEndpoint}/facultystaff/readStaff`, {
        withCredentials: true,
    });
};

// read data of Student only
const readStudents = () => {
    return http.get(`${apiEndpoint}/users/readStudents`, {
        withCredentials: true,
    });
};

// Function for user Search
const searchUser = (searchField) => {
    return http.get(
        `${apiEndpoint}/admin/search`,
        { params: { search: searchField } },
        {
            //req.params.googleID object req.body
            withCredentials: true,
        }
    );
};

const updateClassification = (userInfo) => {
    return http.put(`${apiEndpoint}/admin/updateOtherUser`, userInfo, {
        withCredentials: true,
    });
};
//decrypt data
const decryptToken = (jwt) => {
    const encryption = {
        key: jwtEncryptionKey,
        algorithm: "aes-256-cbc",
    };
    return jwtEncrypt.readJWT(jwt, encryption, "ICSlibrary").data;
};

//read all user logs
const readUserLogs = () => {
    return http.get(`${apiEndpoint}/userlogs/readUserLogs`, {
        withCredentials: true,
    });
};

//clear user logs
const clearUserLogs = () => {
    return http.delete(`${apiEndpoint}/userlogs/deleteAllUserLogs`, {
        withCredentials: true,
    });
};

// put here your newly made functions to export, then "exportFunctions" itself will be the one to be exported
const exportFunctions = {
    loginRegisterUser,
    logoutUser,
    readUser,
    updateNickname,
    deleteUser,
    readAllUsers,
    readAdmins,
    readFaculty,
    readStaff,
    readStudents,
    searchUser,
    getSpecificPerson,
    updateClassification,
    decryptToken,
    readUserLogs,
    clearUserLogs,
};

export default exportFunctions;
