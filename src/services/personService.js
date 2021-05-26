import http from './httpService';
import {apiEndpoint} from '../config.json';


// login/register a person (guess, student, admin, faculty)
const loginRegisterUser=(userInfo)=>{
    return http.post(`${apiEndpoint}/authentication/create`, userInfo);
}

// logout user
const logoutUser=()=>{
    return http.get(`${apiEndpoint}/authentication/logout`);
}


// read data of a person 



// edit data of a person



//delete person




// put here your newly made functions to export, then "exportFunctions" itself will be the one to be exported
const exportFunctions = {
    loginRegisterUser,
    logoutUser
}

export default exportFunctions;
