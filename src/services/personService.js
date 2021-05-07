import http from './httpService';
import {apiEndpoint} from '../config.json';


// login/register a person (guess, student, admin, faculty)
const loginRegisterUser=()=>{
    return http.post(apiEndpoint+'/authentication/create');
}

// read data of a person 



// edit data of a person



//delete person



export default{
    loginRegisterUser
}


// Summary: May 07, 2021
// 1.) use config.json - reference/reuse address of backend
// 2.) httpService.js - reference/reuse "axios" http requests
// 3.) personService.js - all function of http requests
// 4.) resourceService.js - all function of http requests