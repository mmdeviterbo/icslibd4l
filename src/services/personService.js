import http from './httpService';
import {apiEndpoint} from '../config.json';


// login/register a person (guess, student, admin, faculty)
const loginRegisterUser=(userInfo)=>{
    return http.post(apiEndpoint+'/authentication/create', userInfo);
}

// read data of a person 



// edit data of a person



//delete person




// put here your newly made functions to export, then "exportFunctions" itself will be the one to be exported
const exportFunctions = {
    loginRegisterUser
}

export default exportFunctions;