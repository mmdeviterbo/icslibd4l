import http from "./httpService";
import { apiEndpoint } from "../config.json";

// login/register a person (guess, student, admin, faculty)
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
      //req.params.googleID object req.body
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

const updateClassification = (userInfo) => {
  return http.put(`${apiEndpoint}/admin/updateOtherUser`, userInfo, {
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
    getSpecificPerson,
    updateClassification,
};
export default exportFunctions;
